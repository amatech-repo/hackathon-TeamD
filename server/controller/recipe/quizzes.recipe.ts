import { createRoute, z } from "@hono/zod-openapi";
import { QuizDto, QuizzesDto } from "../dto/quizzes.dto";

export const quizzesRecipeGet = createRoute({
  method: "get",
  path: "/",
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

export const quizRecipeGet = createRoute({
  method: "get",
  path: "/:id",
  tags: ["quizzes"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: QuizDto.quizSchema,
        },
      },
      description: "クイズ一覧を取得",
    },
  },
});

export const quizzesMeMadeRecipeGet = createRoute({
  method: "get",
  path: "/me/made",
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

export const quizzesRecipePutQuizId = createRoute({
  method: "put",
  path: "/:id",
  tags: ["quizzes"],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: QuizDto.quizSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "クイズを更新",
      content: {
        "application/json": {
          schema: QuizDto.quizSchema,
        },
      },
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
