import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { TagEntity } from "@server/domain/entity/tag.entity";
import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { ITagRepository } from "@server/domain/interface/repository/tag.repository.interface";
import { QuizSetRepository } from "@server/infra/repository/quiz-set.repository";
import { TagRepository } from "@server/infra/repository/tag.repository";
import { Context } from "hono";

export async function GetQuizSetByIdUseCase({
  id,
  c,
}: {
  id: string;
  c: Context;
}): Promise<{
  quiz: QuizSetEntity;
  tags: TagEntity[];
}> {
  const quizSetRepository: IQuizSetRepository = new QuizSetRepository();
  const tagRepository: ITagRepository = new TagRepository();
  await quizSetRepository.initPrisma(c);
  await tagRepository.initPrisma(c);
  const quiz = await quizSetRepository.getQuizSetById(id);
  const tags = await tagRepository.getTagsByQuizSetId(id);
  return { quiz, tags };
}
