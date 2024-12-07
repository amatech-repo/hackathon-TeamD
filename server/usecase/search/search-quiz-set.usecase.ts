import { SearchQuizSetRepository } from "@server/infra/repository/search-quiz-set.repository";
import { Context } from "hono";

export async function SearchQuizSetUseCase({
  search,
  level,
  tag,
  c,
}: {
  search?: string;
  tag?: string;
  level?: number;
  c: Context;
}) {
  const searchQuizSetRepository = new SearchQuizSetRepository();
  await searchQuizSetRepository.initPrisma(c);
  const searchedQuizSet = await searchQuizSetRepository.search({
    search,
    tag,
    level,
  });
  return searchedQuizSet;
}
