import { ISessionCookieClient } from "@server/domain/interface/client/session-cookie.client.interface";
import { ISessionStoreRepository } from "@server/domain/interface/repository/session-store.repository.interface";
import { SessionCookieClient } from "@server/infra/client/session-cookie.client";
import { SessionStoreRepository } from "@server/infra/repository/session-store.repository";

export class LoginUseCase {
  constructor(
    private readonly sessionStoreRepository: ISessionStoreRepository = new SessionStoreRepository(),
    private readonly sessionCookieClient: ISessionCookieClient = new SessionCookieClient(),
  ) {}

  async exec(sessionId: string): Promise<void> {
    const _value =
      await this.sessionStoreRepository.getSessionFromStore(sessionId);
    this.sessionCookieClient.setSessionToClient(sessionId);
  }
}
