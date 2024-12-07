import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { QuizEntity } from "@server/domain/entity/quiz.entity";
import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { QuizSetRepository } from "@server/infra/repository/quiz-set.repository";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { UserQuizSetAttemptRepository } from "@server/infra/repository/user-quiz-set-attempt.repository";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function StartQuizSetUseCase({
  quizSetId,
  userId,
  c,
}: {
  quizSetId: string;
  userId: string;
  c: Context;
}): Promise<QuizEntity[]> {
  const quizSetRepository: IQuizSetRepository = new QuizSetRepository();
  const quizRepository: IQuizRepository = new QuizRepository();
  const userQuizSetAttemptRepository: IUserQuizSetAttemptRepository =
    new UserQuizSetAttemptRepository();
  await quizSetRepository.initPrisma(c);
  await quizRepository.initPrisma(c);
  await userQuizSetAttemptRepository.initPrisma(c);

  const quizSet = await quizRepository.getQuizzesByQuizSetId(quizSetId);
  if (!quizSet) {
    throw new HTTPException(404, {
      message: "QuizSet not found",
    });
  }
  await userQuizSetAttemptRepository.deleteByUserIdAndQuizSetId({
    userId,
    quizSetId,
  });

  const quizzes = await quizRepository.getQuizzesByQuizSetId(quizSetId);
  return quizzes;
}
