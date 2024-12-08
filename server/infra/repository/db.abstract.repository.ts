import type { PrismaClient } from "@prisma/client";
import type { IDbAbstract } from "@server/domain/interface/repository/db.abstract.interface";
import { getNewPrismaClient } from "@server/libs/prisma-db";
import type { Context } from "hono";

export abstract class DBAbstract implements IDbAbstract {
  abstract prisma: PrismaClient | null;
  async initPrisma(c: Context): Promise<void> {
    if (!this.prisma) {
      this.prisma = await getNewPrismaClient(c);
    }
  }
}
