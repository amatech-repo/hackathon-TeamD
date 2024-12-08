import { createRoute, z } from "@hono/zod-openapi";
import { QuizAttemptDto } from "../dto/quiz-attempt.dto";

const quizAttemptRecipeGetQuizzesQuizId = createRoute({
  method: "get",
  path: "/quizzes/:quizId",
  tags: ["quizAttempt"],
  request: {
    params: z.object({
      quizId: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: QuizAttemptDto.quizAttemptSchema.array(),
        },
      },
    },
  },
});
