import { IAnswerRepository } from "@server/domain/interface/repository/answer.repository.interface";
import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { AnswerRepository } from "@server/infra/repository/answer.repository";
import { QuizSetRepository } from "@server/infra/repository/quiz-set.repository";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { Context } from "hono";

export async function DeleteQuizSetByIdAndUserIdUseCase({
  quizSetId,
  userId,
  c,
}: {
  quizSetId: string;
  userId: string;
  c: Context;
}): Promise<void> {
  const quizSetRepository: IQuizSetRepository = new QuizSetRepository();
  const answerRepository: IAnswerRepository = new AnswerRepository();
  const quizRepository = new QuizRepository();
  await quizSetRepository.initPrisma(c);
  await answerRepository.initPrisma(c);
  await quizSetRepository.deleteQuizSetByIdAndUserId({
    userId,
    quizSetId,
  });
  await answerRepository.deleteAnswerByQuizSetIdAndUserId({
    quizSetId,
    userId,
  });
}
