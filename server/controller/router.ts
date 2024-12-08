import { OpenAPIHono } from "@hono/zod-openapi";
import { authController } from "./auth.controller";
import { usersController } from "./users.controller";
import { searchController } from "./search.controller";
import { userGuard } from "@server/guard/user.guard";
import { rankingController } from "./ranking.controller";
import { tagController } from "./tags.controller";
import { quizAttemptController } from "./quiz-attempt.controller";
import { quizSetAttemptController } from "./quiz-set-attempt.controller";
import { quizzesController } from "./quizzes.controller";
import { quizSetController } from "./quizset.controller";

export const appRouter = new OpenAPIHono();
appRouter.get("/", (c) => {
  console.log("Hello, World!");
  // ここにコントローラーを追加していく
  return c.json({ message: "Hello, World!" });
});

appRouter.route("/auth", authController);

appRouter.use("/*", userGuard()); // 以下はログインが必要なAPI

appRouter.route("/users", usersController);
// appRouter.route("/users/:id", usersController);
appRouter.route("/search", searchController); //使える
// appRouter.route("/ranking", rankingController);
// appRouter.route("/tags", tagController);
// appRouter.route("/quiz-attempt", quizAttemptController);
// appRouter.route("/quizset-attempt", quizSetAttemptController);
appRouter.route("/quizzes", quizzesController);
appRouter.route("/quizset", quizSetController);
