export interface ISessionStoreRepository {
  getSessionFromStore: (sessionId: string) => Promise<unknown>;
}
