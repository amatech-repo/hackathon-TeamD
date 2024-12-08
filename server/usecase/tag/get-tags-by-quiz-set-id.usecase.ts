import { TagEntity } from "@server/domain/entity/tag.entity";
import { ITagRepository } from "@server/domain/interface/repository/tag.repository.interface";
import { TagRepository } from "@server/infra/repository/tag.repository";
import { Context } from "hono";

export function GetTagsByQuizSetIdUseCase({
  quizSetId,
  c,
}: {
  quizSetId: string;
  c: Context;
}): Promise<TagEntity[]> {
  const tagRepository: ITagRepository = new TagRepository();
  tagRepository.initPrisma(c);
  const tags = tagRepository.getTagsByQuizSetId(quizSetId);
  return tags;
}
