import { OpenAPIHono } from "@hono/zod-openapi";
import { UserEntity } from "@server/domain/entity/user.entity";
import { userGuard } from "@server/guard/user.guard";
import { LogoutUseCase } from "@server/usecase/auth/logout.usecase";
import { DeleteUserUseCase } from "@server/usecase/user/delete-user.usecase";
import { GetAllUsersUseCase } from "@server/usecase/user/get-all-users.usecase";
import { GetUserUseCase } from "@server/usecase/user/get-user.usecase";
import { UpdateUserUseCase } from "@server/usecase/user/update-user.usecase";
import { HTTPException } from "hono/http-exception";

export const usersController = new OpenAPIHono();

usersController.use("/*", userGuard());

usersController.get("/", async (c) => {
  const users = await GetAllUsersUseCase(c);
  return c.json(users);
});
usersController.get("/me", async (c) => {
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
  return c.json(user);
});
usersController.put("/me", async (c) => {
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
  return c.json(updatedUser);
});
usersController.delete("/me", async (c) => {
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
usersController.get("/:id", async (c) => {
  const userId = c.req.param("id");
  const user = await GetUserUseCase({ c, userId });
  if (!user) {
    throw new HTTPException(404, {
      message: "User not found",
    });
  }
  return c.json(user);
});
