import { OpenAPIHono } from "@hono/zod-openapi";
import { userGuard } from "@server/guard/user.guard";
import { GetQuizByIdUseCase } from "@server/usecase/quizzes/get-quiz-by-id.usecase";

export const quizzesController = new OpenAPIHono();

//鎌田実装//

quizzesController.use("/*", userGuard());

quizzesController.get("/:id", async (c) => {
  // Captured params

  const id = c.req.param("id");
  const quiz = await GetQuizByIdUseCase({ quizId:id, c:c })
  return c.json(quiz);

});
quizzesController.get("/:id");
quizzesController.get("/me");












