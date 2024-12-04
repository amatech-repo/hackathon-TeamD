import type { ISessionCookieClient } from "@server/domain/interface/client/session-cookie.client.interface";
import type { ISessionStoreRepository } from "@server/domain/interface/repository/session-store.repository.interface";
import { SessionCookieClient } from "@server/infra/client/session-cookie.client";
import { SessionStoreRepository } from "@server/infra/repository/session-store.repository";
import type { Context } from "hono";

export async function IsValidSessionUseCase(c: Context): Promise<boolean> {
  const sessionCookieClient: ISessionCookieClient = new SessionCookieClient();
  const sessionStoreRepository: ISessionStoreRepository =
    new SessionStoreRepository();

  await sessionStoreRepository.initPrisma(c);

  const sessionId = sessionCookieClient.getSessionCookie(c);
  if (!sessionId) {
    return false;
  }

  const isExistSession = await sessionStoreRepository.isExistSession(sessionId);
  if (!isExistSession) {
    return false;
  }

  sessionCookieClient.updateSessionExpires({ sessionId, c });
  await sessionStoreRepository.updateSessionExpires(sessionId);

  return true;
}
