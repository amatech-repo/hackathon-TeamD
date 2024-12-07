import { createRoute } from "@hono/zod-openapi";
import {
  SearchQuizQueryDto,
  SearchQuizResponseDto,
  SearchQuizSetQueryDto,
  SearchQuizSetResponseDto,
} from "../dto/search.dto";

export const searchQuizRecipe = createRoute({
  method: "get",
  path: "/quiz",
  tags: ["search"],
  request: {
    query: SearchQuizQueryDto.searchQuizSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SearchQuizResponseDto.searchQuizResponseSchema.array(),
        },
      },
      description: "クイズを検索",
    },
  },
});

export const searchQuizSetRecipe = createRoute({
  method: "get",
  path: "/quiz-set",
  tags: ["search"],
  request: {
    query: SearchQuizSetQueryDto.searchQuizSetSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SearchQuizSetResponseDto.searchQuizSetResponseSchema.array(),
        },
      },
      description: "クイズセットを検索",
    },
  },
});
