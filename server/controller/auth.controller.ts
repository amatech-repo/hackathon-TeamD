import { discordAuth } from "@hono/oauth-providers/discord";
import { googleAuth } from "@hono/oauth-providers/google";
import { OpenAPIHono } from "@hono/zod-openapi";
import { OAUTH_PROVIDERS } from "@server/config/config";
import { getDiscordEmail } from "@server/libs/discord-email";
import { IsValidSessionUseCase } from "@server/usecase/is-valid-session.usecase";
import { loginWithProviderUseCase } from "@server/usecase/login-with-oauth.usecase";
import { LogoutUseCase } from "@server/usecase/logout.usecase";

export const authController = new OpenAPIHono();
authController.get("/login/*", async (c, next) => {
  if (await IsValidSessionUseCase(c)) {
    return c.redirect("/");
  }
  return next();
});
authController.use(
  "/login/google",
  googleAuth({
    scope: ["openid", "profile", "email"],
  }),
);
authController.use(
  "/login/discord",
  discordAuth({
    scope: ["identify", "email"],
  }),
);
authController.use("/login/discord", getDiscordEmail());
authController.get("/login/google", async (c) => {
  const user = c.get("user-google");
  if (!user || !user.email || !user.id || !user.name) {
    return c.json({
      status: 401,
      body: "Unauthorized",
    });
  }
  await loginWithProviderUseCase({
    email: user.email,
    providerUserId: user.id,
    name: user.name,
    providerId: OAUTH_PROVIDERS.google,
    c,
  });
  return c.redirect("/");
});
authController.get("/login/discord", async (c) => {
  const user = c.get("user-discord");
  const email = c.get("discord-email");
  if (!user || !email || !user.id || !user.username) {
    return c.json({
      status: 401,
      body: "Unauthorized",
    });
  }
  await loginWithProviderUseCase({
    email,
    providerUserId: user.id,
    name: user.username,
    providerId: OAUTH_PROVIDERS.discord,
    c,
  });
  return c.redirect("/");
});
authController.get("/status", async (c) => {
  const isValid = await IsValidSessionUseCase(c);
  return c.json({ isValid });
});

authController.get("/logout", (c) => {
  LogoutUseCase(c);
  return c.redirect("/login");
});
