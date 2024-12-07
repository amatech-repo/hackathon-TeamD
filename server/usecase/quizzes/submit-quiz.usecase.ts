import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";
import { IAnswerOptionRepository } from "@server/domain/interface/repository/answer-option.repository.interface";
import { IUserQuizAttemptRepository } from "@server/domain/interface/repository/user-quiz-attempt.repository.interface";
import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { IUserScoreRepository } from "@server/domain/interface/repository/user-score.repository.interface";
import { AnswerOptionRepository } from "@server/infra/repository/answer-option.repository";
import { UserQuizAttemptRepository } from "@server/infra/repository/user-quiz-attempt.repository";
import { UserQuizSetAttemptRepository } from "@server/infra/repository/user-quiz-set-attempt.repository";
import { UserScoreRepository } from "@server/infra/repository/user-score.repository";
import { Context } from "hono";

export async function SubmitQuizUseCase({
  quizId,
  userId,
  quizSetId,
  submitAnswerId,
  c,
}: {
  quizId: string;
  userId: string;
  quizSetId?: string;
  submitAnswerId: string;
  c: Context;
}): Promise<UserQuizAttemptEntity> {
  // 正解か判別する
  const answerOptionRepository: IAnswerOptionRepository =
    new AnswerOptionRepository();
  const userQuizAttemptRepository: IUserQuizAttemptRepository =
    new UserQuizAttemptRepository();
  const userQuizSetAttemptRepository: IUserQuizSetAttemptRepository =
    new UserQuizSetAttemptRepository();
  const userScoreRepository: IUserScoreRepository = new UserScoreRepository();
  await answerOptionRepository.initPrisma(c);
  await userQuizAttemptRepository.initPrisma(c);
  await userQuizSetAttemptRepository.initPrisma(c);
  await userScoreRepository.initPrisma(c);

  const correctAnswers =
    await answerOptionRepository.getCorrectAnswerOptionByQuizId(quizId);
  const correctAnswerWords = correctAnswers.map(
    (correctAnswers) => correctAnswers.id,
  );
  const isCompleted = correctAnswerWords.includes(submitAnswerId);
  let quizSetAttemptId: string | null = null;
  if (quizSetId) {
    const quizSetAttempt = await userQuizSetAttemptRepository.upsertIncrement({
      userId,
      quizSetId,
      isCompleted,
    });
    if (quizSetAttempt) {
      quizSetAttemptId = quizSetAttempt.id;
    }
  }
  const userQuizAttempt = await userQuizAttemptRepository.upsert({
    quizId,
    userId,
    isCompleted,
    lastSelectedAnswerOptionId: submitAnswerId,
    userQuizSetAttemptId: quizSetId,
  });

  return userQuizAttempt;
}
