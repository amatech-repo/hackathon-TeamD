import { ISessionStoreRepository } from "@server/domain/interface/repository/session-store.repository.interface";

export class SessionStoreRepository implements ISessionStoreRepository {
  async getSessionFromStore(sessionId: string): Promise<unknown> {
    return { sessionId };
  }
}
