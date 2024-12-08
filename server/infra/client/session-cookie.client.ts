import type { Context } from "hono";
import { SESSION_MAX_AGE, SESSION_ID_NAME } from "@server/config/config";
import { getCookie, setCookie } from "hono/cookie";
import type { ISessionCookieClient } from "@server/domain/interface/client/session-cookie.client.interface";
export class SessionCookieClient implements ISessionCookieClient {
  setSessionCookie({ sessionId, c }: { sessionId: string; c: Context }): void {
    console.log("setSessionCookie");
    setCookie(c, SESSION_ID_NAME, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: SESSION_MAX_AGE,
    });
  }
  getSessionCookie(c: Context): string | null {
    return getCookie(c, SESSION_ID_NAME) ?? null;
  }
  deleteSessionCookie(c: Context): void {
    setCookie(c, SESSION_ID_NAME, "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 0,
    });
  }
  updateSessionExpires({
    sessionId,
    c,
  }: {
    sessionId: string;
    c: Context;
  }): void {
    setCookie(c, SESSION_ID_NAME, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: SESSION_MAX_AGE,
    });
  }
}
