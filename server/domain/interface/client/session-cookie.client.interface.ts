import type { Context } from "hono";

export interface ISessionCookieClient {
  setSessionCookie({ sessionId, c }: { sessionId: string; c: Context }): void;
  getSessionCookie(c: Context): string | null;
  deleteSessionCookie(c: Context): void;
  updateSessionExpires({
    sessionId,
    c,
  }: {
    sessionId: string;
    c: Context;
  }): void;
}
