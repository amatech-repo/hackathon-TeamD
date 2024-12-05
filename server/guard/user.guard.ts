import { GetUserIdUseCase } from "@server/usecase/user/get-user-id.usecase";
import { HTTPException } from "hono/http-exception";
import type { MiddlewareHandler } from "hono/types";

export function userGuard(): MiddlewareHandler {
  return async (c, next) => {
    const userId = await GetUserIdUseCase(c);
    if (!userId) {
      c.set("usr_id", undefined);
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }
    c.set("usr_id", userId);
    await next();
  };
}

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ContextVariableMap {
    usr_id: Partial<string> | undefined;
  }
}