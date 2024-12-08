import { createRoute } from "@hono/zod-openapi";
import { UserParamsDto, UserDto } from "../dto/user.dto";

export const userRecipeGetById = createRoute({
  method: "get",
  path: "/",
  tags: ["users"],
  request: {
    params: UserParamsDto.userParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserDto.userSchema,
        },
      },
      description: "特定のユーザー情報を取得",
    },
    404: {
      description: "ユーザーが見つからない",
    },
  },
});
