import type { Context } from "hono";
import type { IOAuthAccountRepository } from "@server/domain/interface/repository/oauth-account.repository.interface";
import { OAuthAccountRepository } from "@server/infra/repository/oauth-account.repository";
import type { ISessionCookieClient } from "@server/domain/interface/client/session-cookie.client.interface";
import { SessionCookieClient } from "@server/infra/client/session-cookie.client";
import { SessionStoreRepository } from "@server/infra/repository/session-store.repository";
import type { ISessionStoreRepository } from "@server/domain/interface/repository/session-store.repository.interface";
import type { IUserRepository } from "@server/domain/interface/repository/user.repository.interface";
import { UserRepository } from "@server/infra/repository/user.repository";
import { IUserScoreRepository } from "@server/domain/interface/repository/user-score.repository.interface";
import { UserScoreRepository } from "@server/infra/repository/user-score.repository";

export async function loginWithProviderUseCase({
  email,
  providerUserId,
  name,
  providerId,
  c,
}: {
  email: string;
  providerUserId: string;
  name: string;
  providerId: string;
  c: Context;
}) {
  const oauthAccountRepository: IOAuthAccountRepository =
    new OAuthAccountRepository();
  const sessionCookieClient: ISessionCookieClient = new SessionCookieClient();
  const sessionStoreRepository: ISessionStoreRepository =
    new SessionStoreRepository();
  const userRepository: IUserRepository = new UserRepository();
  const userScoreRepository: IUserScoreRepository = new UserScoreRepository();

  await oauthAccountRepository.initPrisma(c);
  await sessionStoreRepository.initPrisma(c);
  await userRepository.initPrisma(c);
  await userScoreRepository.initPrisma(c);

  if (!providerUserId || !email || !name) {
    throw new Error("Invalid parameter");
  }

  const sessionId = sessionCookieClient.getSessionCookie(c);
  let userId = email ? (await userRepository.getUserByEmail(email))?.id : null;

  // OAuthアカウントの検索または作成
  let oauthAccount = await oauthAccountRepository.getOAuthAccount({
    providerId,
    providerAccountId: providerUserId,
  });

  // ユーザーが存在しない場合は作成
  if (!userId) {
    const user = await userRepository.createUser({ email, name });
    userId = user.id;

    // ユーザーの作成(スコアなど)
    await userScoreRepository.createUserScore({ userId });
  }

  // OAuthアカウントが存在しない場合は作成
  if (!oauthAccount) {
    oauthAccount = await oauthAccountRepository.createOAuthAccount({
      providerId,
      providerAccountId: providerUserId,
      userId,
    });
  }

  // セッション管理
  if (!sessionId) {
    // 既存のセッションがない場合は新規作成
    const newSessionId = crypto.randomUUID();
    sessionCookieClient.setSessionCookie({
      c,
      sessionId: newSessionId,
    });
    await sessionStoreRepository.setSession({
      sessionId: newSessionId,
      userId,
    });
  } else {
    // 既存セッションの有効期限を更新
    await sessionStoreRepository.updateSessionExpires(sessionId);
    sessionCookieClient.updateSessionExpires({ sessionId, c });
  }
}
