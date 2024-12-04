import { ISessionCookieClient } from "@server/domain/interface/client/session-cookie.client.interface";

export class SessionCookieClient implements ISessionCookieClient {
  setSessionToClient(sessionId: string): void {
    console.log(sessionId);
  }
}
