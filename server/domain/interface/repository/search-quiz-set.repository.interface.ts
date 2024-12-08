import { SearchQuizSetEntity } from "@server/domain/entity/search-quiz-set.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface ISearchQuizSetRepository extends IDbAbstract {
  search({
    search,
    level,
    tag,
  }: {
    search?: string;
    tag?: string;
    level?: number;
  }): Promise<SearchQuizSetEntity[]>;
}
