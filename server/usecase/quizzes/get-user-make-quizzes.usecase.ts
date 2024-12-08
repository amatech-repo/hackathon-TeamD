import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { QuizSetRepository } from "@server/infra/repository/quiz-set.repository";
import { Context } from "hono";

export async function GetUserMakeQuizSetsUseCase({
  userId,
  c,
}: {
  userId: string;
  c: Context;
}): Promise<QuizSetEntity[]> {
  const quizSetRepository: IQuizSetRepository = new QuizSetRepository();
  await quizSetRepository.initPrisma(c);
  return await quizSetRepository.getQuizSetsByCreatorId(userId);
}
