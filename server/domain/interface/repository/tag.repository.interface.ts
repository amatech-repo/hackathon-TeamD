import { TagEntity } from "@server/domain/entity/tag.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface ITagRepository extends IDbAbstract {
  getTag(id: string): Promise<TagEntity | null>;
  getTags(): Promise<TagEntity[]>;
  getTagsByQuizSetId(quizSetId: string): Promise<TagEntity[]>;
  createTag({ name }: { name: string }): Promise<TagEntity>;
  updateTag({
    id,
    name,
  }: {
    id: string;
    name: string;
  }): Promise<TagEntity | null>;
  deleteTag(id: string): Promise<void>;
}
