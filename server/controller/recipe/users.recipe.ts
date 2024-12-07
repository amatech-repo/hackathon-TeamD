import { createRoute } from "@hono/zod-openapi";
import {
  UserDto,
  UserParamsDto,
  UsersDto,
  UserUpdateDto,
} from "../dto/user.dto";

export const usersRecipeGet = createRoute({
  method: "get",
  path: "/",
  tags: ["users"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UsersDto.usersSchema,
        },
      },
      description: "ユーザー一覧を取得",
    },
  },
});

export const userRecipeGetMe = createRoute({
  method: "get",
  path: "/me",
  tags: ["users"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserDto.userSchema,
        },
      },
      description: "ログインユーザーの情報を取得",
    },
    401: {
      description: "未ログイン",
    },
    404: {
      description: "ユーザーが見つからない",
    },
  },
});

export const userRecipeUpdateMe = createRoute({
  method: "put",
  path: "/me",
  tags: ["users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserUpdateDto.usersUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserDto.userSchema,
        },
      },
      description: "ユーザー情報を更新",
    },
    401: {
      description: "未ログイン",
    },
  },
});

export const userRecipeDeleteMe = createRoute({
  method: "delete",
  path: "/me",
  tags: ["users"],
  responses: {
    302: {
      description: "ログアウトしてリダイレクト",
    },
    401: {
      description: "未ログイン",
    },
  },
});
