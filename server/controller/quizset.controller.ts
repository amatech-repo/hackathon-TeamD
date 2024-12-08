import { OpenAPIHono } from "@hono/zod-openapi";
import { StartQuizSetUseCase } from "@server/usecase/quizset/start-quiz-set.usecase";
import { HTTPException } from "hono/http-exception";
import { CreateQuizSetUseCase } from "@server/usecase/quizset/create-quiz-set.usecase";
import { GetQuizSetByIdUseCase } from "@server/usecase/quizset/get-quiz-set-by-id.usecase";
import { DeleteQuizSetByIdAndUserIdUseCase } from "@server/usecase/quizset/delete-quiz-set-by-id-ans-user-id.usecase";
import { UpdateQuizSetByIdAndUserIdUseCase } from "@server/usecase/quizset/update-quiz-set-by-id-and-user-id.usecase";
import { GetQuizSetAttemptsByUserIdUseCase } from "@server/usecase/quizset-attempt/get-quizset-attempts-by-user-id.usecase";
import { GetQuizSetAttemptByQuizSetIdAndUserIdUseCase } from "@server/usecase/quizset-attempt/get-quizset-attempt-by-quiz-id-and-user-id.usecase";

export const quizSetController = new OpenAPIHono();

quizSetController.post("/", async (c) => {
  const creatorId = c.get("user_id");
  if (!creatorId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const quizControllerBody = await c.req.json<{
    title: string;
    description?: string;
    level: number;
    isPublic: boolean;
    tags: string[];
    quizzes: {
      question: string;
      type: string;
      options: {
        isCorrect: boolean; //createdOptionsの部分
        option: string;
      }[];
    }[];
  }>();
  const createdQuizSet = await CreateQuizSetUseCase({
    ...quizControllerBody,
    creatorId,
    c,
  });
  return c.json(createdQuizSet);
});
// クイズセットを追加

quizSetController.get("/:id", async (c) => {
  const quizSetId = c.req.param("id");
  const gotQuizSetAndQuizzes = await GetQuizSetByIdUseCase({
    id: quizSetId,
    c,
  });
  return c.json({
    quizSetTitle: gotQuizSetAndQuizzes.quizSet.title,
    quizSetLevel: gotQuizSetAndQuizzes.quizSet.level,
    quizSetDescription: gotQuizSetAndQuizzes.quizSet.description,
    quizzesId: gotQuizSetAndQuizzes.quizzes.map((quiz) => quiz.id),
  });
});
// クイズセットとIDを取得

// quizSetController.put("/:id", async (c) => {
//   const quizSetId = c.req.param("id");
//   const userId = c.get("user_id");
//   const body = await c.req.json<{
//     title: string;
//     description?: string;
//     level: number;
//     creatorId: string;
//     isPublic: boolean;
//     tags: string[];
//     quizzes: {
//       question: string;
//       type: string;
//       options: {
//         isCorrect: boolean; //createdOptionsの部分
//         option: string;
//       }[];
//     }[];
//   }>();
//   if (!userId) {
//     throw new HTTPException(401, {
//       message: "Unauthorized",
//     });
//   }

//   const updatedQuizSet = await UpdateQuizSetByIdAndUserIdUseCase({
//     id: quizSetId,
//     userId,
//     ...body,
//     c,
//   });

//   return c.json(updatedQuizSet);
// });
// quizSetController.delete("/:id", async (c) => {
//   const quizSetId = c.req.param("id");
//   const userId = c.get("user_id");
//   if (!userId) {
//     throw new HTTPException(401, {
//       message: "Unauthorized",
//     });
//   }
//   await DeleteQuizSetByIdAndUserIdUseCase({
//     quizSetId,
//     userId,
//     c,
//   });
//   return c.json(200);
// });

quizSetController.post("/:id/start", async (c) => {
  const quizSetId = c.req.param("id");
  const userId = c.get("user_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const quizSetAttempt = await StartQuizSetUseCase({
    quizSetId,
    userId,
    c,
  });
  return c.json(quizSetAttempt);
});
// クイズセットの開始
quizSetController.get("/:id/result", async (c) => {
  const quizSetId = c.req.param("id");
  const userId = c.get("user_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  const quizSetAttempt = await GetQuizSetAttemptByQuizSetIdAndUserIdUseCase({
    c,
    userId,
    quizSetId,
  });
  return c.json({
    score: quizSetAttempt.lastQuizzesScore,
  });
});
// クイズセットを解くように実装
