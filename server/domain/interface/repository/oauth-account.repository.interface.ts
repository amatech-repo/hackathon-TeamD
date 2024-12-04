import type { OAuthAccount } from "@prisma/client";
import type { IDbAbstract } from "./db.abstract.interface";

export interface IOAuthAccountRepository extends IDbAbstract {
  createOAuthAccount({
    providerId,
    providerAccountId,
    userId,
  }: {
    providerId: string;
    providerAccountId: string;
    userId: string;
  }): Promise<OAuthAccount>;

  getOAuthAccount({
    providerId,
    providerAccountId,
  }: {
    providerId: string;
    providerAccountId: string;
  }): Promise<OAuthAccount | null>;
}
