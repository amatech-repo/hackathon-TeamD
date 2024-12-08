import { createRoute } from "@hono/zod-openapi";
import { AuthDto } from "../dto/auth.dto";

export const authRecipeStatusGet = createRoute({
  method: "get",
  path: "/status",
  tags: ["auth"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: AuthDto.authStateSchema,
        },
      },
      description: "認証ができているか",
    },
  },
});

export const authRecipeLoginGoogleGet = createRoute({
  method: "get",
  path: "/login/google",
  tags: ["auth"],
  responses: {
    200: {
      description: "Googleでログイン",
    },
    302: {
      description: "リダイレクト",
    },
  },
});

export const authRecipeLoginDiscordGet = createRoute({
  method: "get",
  path: "/login/discord",
  tags: ["auth"],
  responses: {
    200: {
      description: "Discordでログイン",
    },
  },
});

export const authRecipeLogoutGet = createRoute({
  method: "get",
  path: "/logout",
  tags: ["auth"],
  responses: {
    302: {
      description: "リダイレクト",
    },
  },
});
