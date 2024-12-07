import { OpenAPIHono } from "@hono/zod-openapi";
import { GetQuizSetAttemptById } from "@server/usecase/quizset-attempt/get-quizset-attempt-by-id.usecase";
import { GetQuizSetAttemptByQuizSetIdAndUserIdUseCase } from "@server/usecase/quizset-attempt/get-quizset-attempt-by-quiz-id-and-user-id.usecase";
import { GetQuizSetAttemptsByQuizSetIdUseCase } from "@server/usecase/quizset-attempt/get-quizset-attempts-by-quiz-id.usecase";
import { GetQuizSetAttemptsByUserIdUseCase } from "@server/usecase/quizset-attempt/get-quizset-attempts-by-user-id.usecase";
import { HTTPException } from "hono/http-exception";

export const quizSetAttemptController = new OpenAPIHono();

quizSetAttemptController.get("/quizset/:quizsetId", async (c) => {
  const quizSetId = c.req.param("quizsetId");
  const gotQuizAttempts = await GetQuizSetAttemptsByQuizSetIdUseCase({
    c,
    quizSetId,
  });
  return c.json(gotQuizAttempts);
});
quizSetAttemptController.get("/users/me", async (c) => {
  const userId = c.get("user_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const gotQuizAttempts = await GetQuizSetAttemptsByUserIdUseCase({
    c,
    userId,
  });
  return c.json(gotQuizAttempts);
});

quizSetAttemptController.get("users/me/quizset/:quizsetId", async (c) => {
  const userId = c.get("user_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const quizSetId = c.req.param("quizsetId");
  const gotQuizAttempts = await GetQuizSetAttemptByQuizSetIdAndUserIdUseCase({
    c,
    userId,
    quizSetId,
  });
  return c.json(gotQuizAttempts);
});

quizSetAttemptController.get("/:id", async (c) => {
  const id = c.req.param("id");
  const gotQuizAttempt = await GetQuizSetAttemptById({
    c,
    id,
  });
  return c.json(gotQuizAttempt);
});
