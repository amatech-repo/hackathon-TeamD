import { OpenAPIHono } from "@hono/zod-openapi";
import { authController } from "./auth.controller";
import { usersController } from "./users.controller";

export const appRouter = new OpenAPIHono();
appRouter.get("/", (c) => {
  console.log("Hello, World!");
  // ここにコントローラーを追加していく
  return c.json({ message: "Hello, World!" });
});

appRouter.route("/auth", authController);
appRouter.route("/users", usersController);

