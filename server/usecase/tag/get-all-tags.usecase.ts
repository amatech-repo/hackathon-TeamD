import { TagEntity } from "@server/domain/entity/tag.entity";
import { ITagRepository } from "@server/domain/interface/repository/tag.repository.interface";
import { TagRepository } from "@server/infra/repository/tag.repository";
import { Context } from "hono";

export async function GetAllTagsUseCase(c: Context): Promise<TagEntity[]> {
  const tagRepository: ITagRepository = new TagRepository();
  await tagRepository.initPrisma(c);
  const tags = await tagRepository.getTags();
  return tags;
}
