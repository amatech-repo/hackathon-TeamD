import { ISearchQuizRepository } from "@server/domain/interface/repository/search-quiz.repository.interface";
import { SearchQuizRepository } from "@server/infra/repository/search-quiz.repository";
import { Context } from "hono";

export async function SearchQuizUseCase({
  search,
  level,
  c,
}: {
  search?: string;
  level?: number;
  c: Context;
}) {
  const searchQuizRepository: ISearchQuizRepository =
    new SearchQuizRepository();
  await searchQuizRepository.initPrisma(c);
  const searchedQuiz = await searchQuizRepository.search({
    search,
    level,
  });
  return searchedQuiz;
}
