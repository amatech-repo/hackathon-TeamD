import { createRoute } from "@hono/zod-openapi";
import { QuizzesDto } from "../dto/quizzes.dto";

export const quizzesRecipeGet = createRoute({
  method: "get",
  path: "/quizzes",
  tags: ["quizzes"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: QuizzesDto.quizzesSchema,
        },
      },
      description: "クイズ一覧を取得",
    },
  },
});

export const quizzesRecipePost = createRoute({
  method: "post",
  path: "/",
  tags: ["quizzes"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: QuizzesDto.quizzesSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "クイズを作成",
    },
  },
});
