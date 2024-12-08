import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { QuizEntity } from "@server/domain/entity/quiz.entity";
import { TagEntity } from "@server/domain/entity/tag.entity";
import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { ITagRepository } from "@server/domain/interface/repository/tag.repository.interface";
import { QuizSetRepository } from "@server/infra/repository/quiz-set.repository";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { TagRepository } from "@server/infra/repository/tag.repository";
import { Context } from "hono";

export async function GetQuizSetByIdUseCase({
  id,
  c,
}: {
  id: string;
  c: Context;
}): Promise<{
  quizSet: QuizSetEntity;
  quizzes: QuizEntity[];
}> {
  const quizSetRepository: IQuizSetRepository = new QuizSetRepository();
  const quizRepository: IQuizRepository = new QuizRepository();
  await quizSetRepository.initPrisma(c);
  await quizRepository.initPrisma(c);
  const quizSet = await quizSetRepository.getQuizSetById(id);
  const quizzes = await quizRepository.getQuizzesByQuizSetId(id);
  return {
    quizSet,
    quizzes,
  };
}
