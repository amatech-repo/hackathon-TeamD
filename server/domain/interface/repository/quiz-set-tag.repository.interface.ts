import { IDbAbstract } from "./db.abstract.interface";

export interface IQuizSetTagRepository extends IDbAbstract {
  createOneQuizSetAndManyTags({
    quizSetId,
    tagIds,
  }: {
    quizSetId: string;
    tagIds: string[];
  }): Promise<void>;
}
