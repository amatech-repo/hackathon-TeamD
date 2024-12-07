import { OpenAPIHono } from "@hono/zod-openapi";
import { userGuard } from "@server/guard/user.guard";
import { CreateQuizUseCase } from "@server/usecase/quizzes/create-quiz.usecase";
import { GetQuizByIdUseCase } from "@server/usecase/quizzes/get-quiz-by-id.usecase";
import { HTTPException } from "hono/http-exception";

export const quizzesController = new OpenAPIHono();

//鎌田実装//

quizzesController.use("/*", userGuard());

quizzesController.get("/me"); //

quizzesController.post("/", async (c) => {
  const creatorId = c.get("user_id");
  const quizControllerBody = await c.req.json<{
    level: number;
    isPublic: boolean;
    question: string;
    type: string;
    options: {
      isCorrect: boolean; //createdOptionsの部分
      option: string;
    }[];
  }>();
  if (!creatorId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const quizEntity = await CreateQuizUseCase({
    ...quizControllerBody,
    c,
    creatorId,
  });
  console.log(JSON.stringify(quizEntity));
  return c.json(quizEntity);
});

quizzesController.get("/");
quizzesController.get("/:id", async (c) => {
  // Captured params

  const id = c.req.param("id");
  const quiz = await GetQuizByIdUseCase({ quizId: id, c: c });
  return c.json(quiz);
});
