import { ITagRepository } from "@server/domain/interface/repository/tag.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { TagEntity } from "@server/domain/entity/tag.entity";
import { PrismaClient } from "@prisma/client";

export class TagRepository extends DBAbstract implements ITagRepository {
  prisma: PrismaClient | null = null;
  getTag(id: string): Promise<TagEntity | null> {
    throw new Error("Method not implemented.");
  }
  getTags(): Promise<TagEntity[]> {
    throw new Error("Method not implemented.");
  }
  getTagsByQuizSetId(quizSetId: string): Promise<TagEntity[]> {
    throw new Error("Method not implemented.");
  }
  createTag({ name }: { name: string }): Promise<TagEntity> {
    throw new Error("Method not implemented.");
  }
  updateTag({
    id,
    name,
  }: {
    id: string;
    name: string;
  }): Promise<TagEntity | null> {
    throw new Error("Method not implemented.");
  }
  deleteTag(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
