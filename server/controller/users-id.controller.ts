import { OpenAPIHono } from "@hono/zod-openapi";
import { GetUserScoreByUserIdUseCase } from "@server/usecase/user-score/get-user-score-by-user-id.usecase";
import { GetUserUseCase } from "@server/usecase/user/get-user.usecase";
import { HTTPException } from "hono/http-exception";
import { userRecipeGetById } from "./recipe/users-id.recipe";

const usersIdController = new OpenAPIHono();

// 使わない
// users/:id以下

usersIdController.openapi(userRecipeGetById, async (c) => {
  const userId = c.req.param("id");
  if (!userId) {
    throw new HTTPException(400, {
      message: "userId is required",
    });
  }
  const user = await GetUserUseCase({ c, userId });
  if (!user) {
    throw new HTTPException(404, {
      message: "User not found",
    });
  }
  return c.json(user);
});

usersIdController.get("/score", async (c) => {
  const userId = c.req.param("id");
  if (!userId) {
    throw new HTTPException(400, {
      message: "userId is required",
    });
  }
  const score = await GetUserScoreByUserIdUseCase({ userId, c });
  if (!score) {
    throw new HTTPException(404, {
      message: "User score not found",
    });
  }
  return c.json(score);
});
