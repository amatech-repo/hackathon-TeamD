import { discordAuth } from "@hono/oauth-providers/discord";
import { googleAuth } from "@hono/oauth-providers/google";
import { OpenAPIHono } from "@hono/zod-openapi";
import { OAUTH_PROVIDERS } from "@server/config/config";
import { getDiscordEmail } from "@server/libs/discord-email";
import { IsUserLogin } from "@server/usecase/auth/is-user-login.usecase";
import { loginWithProviderUseCase } from "@server/usecase/auth/login-with-oauth.usecase";
import { LogoutUseCase } from "@server/usecase/auth/logout.usecase";
import {
  authRecipeLoginDiscordGet,
  authRecipeLoginGoogleGet,
  authRecipeLogoutGet,
  authRecipeStatusGet,
} from "./recipe/auth.recipe";
import { AuthDto } from "./dto/auth.dto";

export const authController = new OpenAPIHono();

authController.use("/login/*", async (c, next) => {
  if (await IsUserLogin(c)) {
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

authController.openapi(authRecipeLoginGoogleGet, async (c) => {
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
authController.openapi(authRecipeLoginDiscordGet, async (c) => {
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
authController.openapi(authRecipeStatusGet, async (c) => {
  const isValid = await IsUserLogin(c);
  return c.json(AuthDto.entityToDto({ isValid }));
});
authController.openapi(authRecipeLogoutGet, async (c) => {
  await LogoutUseCase(c);
  return c.redirect("/login");
});
