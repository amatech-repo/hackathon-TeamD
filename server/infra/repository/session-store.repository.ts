import { PrismaClient } from "@prisma/client";
import type { ISessionStoreRepository } from "@server/domain/interface/repository/session-store.repository.interface";
import { HTTPException } from "hono/http-exception";
import { DBAbstract } from "./db.abstract.repository";
import { SESSION_MAX_AGE } from "@server/config/config";

export class SessionStoreRepository
  extends DBAbstract
  implements ISessionStoreRepository
{
  prisma: PrismaClient | null = null;

  async isExistSession(sessionId: string): Promise<boolean> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const session = await this.prisma.session.findUnique({
        where: {
          sessionId,
        },
      });
      if (!session || session.expires < new Date()) {
        return false;
      }
      return true;
    } catch (e) {
      console.error("error at isExistSession", e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async setSession({
    sessionId,
    userId,
  }: {
    sessionId: string;
    userId: string;
  }): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.session.create({
        data: {
          sessionId,
          expires: new Date(Date.now() + 1000 * SESSION_MAX_AGE),
          userId,
        },
      });
    } catch (e) {
      console.error("error at setSession", e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateSessionExpires(sessionId: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.session.update({
        where: {
          sessionId,
        },
        data: {
          expires: new Date(Date.now() + 1000 * SESSION_MAX_AGE),
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteSession(sessionId: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.session.delete({
        where: {
          sessionId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async cleanUpSessions(): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.session.deleteMany({
        where: {
          expires: {
            lt: new Date(),
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
  async getUserIdBySession(sessionId: string): Promise<string | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const session = await this.prisma.session.findFirst({
        where: {
          sessionId,
        },
      });
      if (!session || session.expires < new Date()) {
        this.deleteSession(sessionId);
        return null;
      }
      return session.userId;
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
}
