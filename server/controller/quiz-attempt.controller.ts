import { OpenAPIHono } from "@hono/zod-openapi";
import { GetQuizAttemptsByUserIdUseCase } from "@server/usecase/quiz-attempt/get-quiz-attempts-by-user-id.usecase";
import { HTTPException } from "hono/http-exception";

export const quizAttemptController = new OpenAPIHono();

// quizAttemptController.get("/quizzes/:quizId", async (c) => {
//   const quizId = c.req.param("quizId");
//   const gotQuizAttempts = await GetQuizAttemptsByQuizIdUseCase({
//     c,
//     quizId,
//   });
//   return c.json(gotQuizAttempts);
// });
quizAttemptController.get("/users/me", async (c) => {
  const userId = c.get("user_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const gotQuizAttempts = await GetQuizAttemptsByUserIdUseCase({
    c,
    userId,
  });
  return c.json(
    gotQuizAttempts.map((quizAttempt) => ({
      quizId: quizAttempt.quizId,
      score: quizAttempt.score,
      title: quizAttempt.title,
    })),
  );
});

// quizAttemptController.get("users/me/quizzes/:quizId", async (c) => {
//   const userId = c.get("user_id");
//   if (!userId) {
//     throw new HTTPException(401, {
//       message: "Unauthorized",
//     });
//   }
//   const quizId = c.req.param("quizId");
//   const gotQuizAttempts = await GetQuizAttemptByQuizIdAndUserIdUseCase({
//     c,
//     userId,
//     quizId,
//   });
//   return c.json(gotQuizAttempts);
// });

// quizAttemptController.get("/:id", async (c) => {
//   const id = c.req.param("id");
//   const gotQuizAttempt = await GetQuizAttemptById({
//     c,
//     id,
//   });
//   return c.json(gotQuizAttempt);
// });
