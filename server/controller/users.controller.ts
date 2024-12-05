import { OpenAPIHono } from "@hono/zod-openapi";
import { UserEntity } from "@server/domain/entity/user.entity";
import { userGuard } from "@server/guard/user.guard";
import { LogoutUseCase } from "@server/usecase/auth/logout.usecase";
import { DeleteUserUseCase } from "@server/usecase/user/delete-user.usecase";
import { GetAllUsersUseCase } from "@server/usecase/user/get-all-users.usecase";
import { GetUserUseCase } from "@server/usecase/user/get-user.usecase";
import { UpdateUserUseCase } from "@server/usecase/user/update-user.usecase";
import { HTTPException } from "hono/http-exception";
import {
  userRecipeGetById,
  userRecipeGetMe,
  userRecipeUpdateMe,
  usersRecipeGet,
} from "./recipe/users.recipe";
import { UserDto, UsersDto } from "./dto/user.dto";

export const usersController = new OpenAPIHono();

usersController.use("/*", userGuard());

usersController.openapi(usersRecipeGet, async (c) => {
  const users = await GetAllUsersUseCase(c);
  return c.json(UsersDto.entityToDto(users));
});

usersController.openapi(userRecipeGetMe, async (c) => {
  const userId = c.get("usr_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "you are not login",
    });
  }
  const user = await GetUserUseCase({ c, userId });
  if (!user) {
    throw new HTTPException(404, {
      message: "User not found",
    });
  }
  return c.json(UserDto.entityToDto(user));
});
usersController.openapi(userRecipeUpdateMe, async (c) => {
  const userId = c.get("usr_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "you are not login",
    });
  }
  const { name } = await c.req.json();
  const updatedUser: UserEntity = await UpdateUserUseCase({
    c,
    userId,
    name,
  });
  return c.json(UserDto.entityToDto(updatedUser));
});
usersController.openapi(userRecipeUpdateMe, async (c) => {
  const userId = c.get("usr_id");
  if (!userId) {
    throw new HTTPException(401, {
      message: "you are not login",
    });
  }
  await LogoutUseCase(c);
  await DeleteUserUseCase({ c, userId });
  return c.redirect("/");
});
usersController.openapi(userRecipeGetById, async (c) => {
  const userId = c.req.param("id");
  const user = await GetUserUseCase({ c, userId });
  if (!user) {
    throw new HTTPException(404, {
      message: "User not found",
    });
  }
  return c.json(user);
});
