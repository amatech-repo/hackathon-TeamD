import { IDbAbstract } from "./db.abstract.interface";
import { SearchQuizEntity } from "@server/domain/entity/search-quiz.entity";

export interface ISearchQuizRepository extends IDbAbstract {
  search({
    search,
    level,
  }: {
    search?: string;
    level?: number;
  }): Promise<SearchQuizEntity[]>;
}
