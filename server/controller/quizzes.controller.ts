import { OpenAPIHono } from "@hono/zod-openapi";
import { userGuard } from "@server/guard/user.guard";
import { CreateQuizUseCase } from "@server/usecase/quizzes/create-quiz.usecase";
import { DeleteQuizByIdAndUserIdUseCase } from "@server/usecase/quizzes/delete-quiz-by-id-and-user-id.usecase";
import { GetQuizByIdUseCase } from "@server/usecase/quizzes/get-quiz-by-id.usecase";
import { GetUserMakeQuizSetsUseCase } from "@server/usecase/quizzes/get-user-make-quizzes.usecase";
import { SubmitQuizUseCase } from "@server/usecase/quizzes/submit-quiz.usecase";
import { UpdateQuizByIdAndUserIdUseCase } from "@server/usecase/quizzes/update-quiz-by-id-and-user-id.usecase";
import { HTTPException } from "hono/http-exception";
import {
  quizRecipeGet,
  quizzesMeMadeRecipeGet,
  quizzesRecipePost,
} from "./recipe/quizzes.recipe";
import { QuizDto } from "./dto/quizzes.dto";

export const quizzesController = new OpenAPIHono();

//鎌田実装//

quizzesController.use("/*", userGuard());

// quizzesController.openapi(quizzesMeMadeRecipeGet, async (c) => {
//   const userId = c.get("user_id");
//   if (!userId) {
//     throw new HTTPException(401, {
//       message: "Unauthorized",
//     });
//   }
//   const userMadeQuizSet = await GetUserMakeQuizSetsUseCase({ userId, c });
//   return c.json(userMadeQuizSet);
// }); //

// quizzesController.openapi(quizzesRecipePost, async (c) => {
//   const creatorId = c.get("user_id");
//   const quizControllerBody = await c.req.json<{
//     level: number;
//     isPublic: boolean;
//     question: string;
//     type: string;
//     options: {
//       isCorrect: boolean; //createdOptionsの部分
//       option: string;
//     }[];
//   }>();
//   if (!creatorId) {
//     throw new HTTPException(401, {
//       message: "Unauthorized",
//     });
//   }
//   const quizEntity = await CreateQuizUseCase({
//     ...quizControllerBody,
//     c,
//     creatorId,
//   });
//   return c.json(quizEntity);
// });

quizzesController.get("/:id", async (c) => {
  const id = c.req.param("id");
  const quiz = await GetQuizByIdUseCase({ quizId: id, c: c });
  return c.json({
    level: quiz.quiz.level,
    title: quiz.question.question,
    option: quiz.answerOptions.map((option) => {
      return {
        id: option.id,
        option: option.option,
      };
    }),
  });
});

// quizzesController.put("/:id", async (c) => {
//   // Captured params

//   const creatorId = c.get("user_id");
//   const quizControllerBody = await c.req.json<{
//     level: number;
//     isPublic: boolean;
//     question: string;
//     type: string;
//     options: {
//       isCorrect: boolean; //createdOptionsの部分
//       option: string;
//     }[];
//   }>();
//   const id = c.req.param("id");
//   if (!creatorId) {
//     throw new HTTPException(401, {
//       message: "Unauthorized",
//     });
//   }
//   const updatedQuizResult = await UpdateQuizByIdAndUserIdUseCase({
//     id,
//     level: quizControllerBody.level,
//     c,
//     isPublic: quizControllerBody.isPublic,
//     creatorId,
//     question: quizControllerBody.question,
//     type: quizControllerBody.type,
//     options: quizControllerBody.options,
//   });
//   const returnData: {
//     level: number;
//     isPublic: boolean;
//     question: string;
//     type: string;
//     options: {
//       isCorrect: boolean; //createdOptionsの部分
//       option: string;
//     }[];
//   } = {
//     level: updatedQuizResult.quiz.level,
//     isPublic: updatedQuizResult.quiz.isPublic,
//     question: updatedQuizResult.question.question,
//     type: updatedQuizResult.answer.type,
//     options: updatedQuizResult.answerOptions,
//   };
//   return c.json(returnData);
// });

// quizzesController.delete("/:id", async (c) => {
//   const userId = c.get("user_id");
//   const id = c.req.param("id");
//   if (!userId) {
//     throw new HTTPException(401, {
//       message: "Unauthorized",
//     });
//   }
//   await DeleteQuizByIdAndUserIdUseCase({
//     quizId: id,
//     c,
//     creatorId: userId,
//   });
//   return c.json(200);
// });
quizzesController.post("/:id/submit", async (c) => {
  const userId = c.get("user_id");
  const quizId = c.req.param("id");
  const quizSetId = c.req.query("quizsetId");
  const { submitAnswerId } = await c.req.json<{ submitAnswerId: string }>();
  if (!userId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const quizAttempt = await SubmitQuizUseCase({
    quizId,
    c,
    userId,
    quizSetId,
    submitAnswerId,
  });
  return c.json({ success: quizAttempt.isCompleted });
});
// クイズ一問ずつを解くように実装
