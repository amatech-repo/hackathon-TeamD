import { PrismaClient, type OAuthAccount } from "@prisma/client";
import type { IOAuthAccountRepository } from "@server/domain/interface/repository/oauth-account.repository.interface";
import { HTTPException } from "hono/http-exception";
import { DBAbstract } from "./db.abstract.repository";

export class OAuthAccountRepository
  extends DBAbstract
  implements IOAuthAccountRepository
{
  prisma: PrismaClient | null = null;
  async createOAuthAccount({
    providerId,
    providerAccountId,
    userId,
  }: {
    providerId: string;
    providerAccountId: string;
    userId: string;
  }): Promise<OAuthAccount> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      return await this.prisma.oAuthAccount.create({
        data: {
          providerId,
          providerAccountId,
          userId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  async getOAuthAccount({
    providerId,
    providerAccountId,
  }: {
    providerId: string;
    providerAccountId: string;
  }): Promise<OAuthAccount | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      return await this.prisma.oAuthAccount.findUnique({
        where: {
          providerId_providerAccountId: {
            providerId,
            providerAccountId,
          },
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
}
