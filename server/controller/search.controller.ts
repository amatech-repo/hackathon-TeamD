import { OpenAPIHono } from "@hono/zod-openapi";
import { searchQuizRecipe, searchQuizSetRecipe } from "./recipe/search.recipe";
import { SearchQuizUseCase } from "@server/usecase/search/search-quiz.usecase";
import {
  SearchQuizResponseDto,
  SearchQuizSetResponseDto,
} from "./dto/search.dto";
import { SearchQuizSetUseCase } from "@server/usecase/search/search-quiz-set.usecase";

export const searchController = new OpenAPIHono();

searchController.openapi(searchQuizRecipe, async (c) => {
  const searchQuery = c.req.query("search_query");
  const levelQuery = c.req.query("level_query");
  let level: number | null = null;
  if (levelQuery) {
    level = parseInt(levelQuery) || null;
  }
  const searched = await SearchQuizUseCase({
    search: searchQuery,
    level: level ?? undefined,
    c,
  });
  return c.json(SearchQuizResponseDto.toDtos(searched));
});

searchController.openapi(searchQuizSetRecipe, async (c) => {
  const searchQuery = c.req.query("search_query");
  const tagQuery = c.req.query("tag_query");
  const levelQuery = c.req.query("level_query");
  let level: number | null = null;
  if (levelQuery) {
    level = parseInt(levelQuery) || null;
  }
  const searched = await SearchQuizSetUseCase({
    search: searchQuery,
    tag: tagQuery,
    level: level ?? undefined,
    c,
  });
  return c.json(SearchQuizSetResponseDto.toDtos(searched));
});
