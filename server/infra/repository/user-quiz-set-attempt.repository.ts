import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { PrismaClient, UserQuizSetAttempt } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class UserQuizSetAttemptRepository
  extends DBAbstract
  implements IUserQuizSetAttemptRepository
{
  prisma: PrismaClient | null = null;
  async upsert({
    userId,
    quizSetId,
    lastCorrectQuizzesCount,
    lastQuizzesScore,
    isCompleted,
  }: {
    userId: string;
    quizSetId: string;
    lastCorrectQuizzesCount: number;
    lastQuizzesScore: number;
    isCompleted: boolean;
  }): Promise<UserQuizSetAttemptEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizSetAttempt = await this.prisma.userQuizSetAttempt.upsert({
        where: {
          userId_quizSetId: {
            userId,
            quizSetId,
          },
        },
        update: {
          lastCorrectQuizzesCount,
          lastQuizzesScore,
          isCompleted,
        },
        create: {
          userId,
          quizSetId,
          lastCorrectQuizzesCount,
          lastQuizzesScore,
          isCompleted,
        },
      });
      return UserQuizSetAttemptRepository.toEntity(userQuizSetAttempt);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getById(id: string): Promise<UserQuizSetAttemptEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizSetAttempt =
        await this.prisma.userQuizSetAttempt.findUnique({
          where: {
            id,
          },
        });
      if (!userQuizSetAttempt) {
        throw new HTTPException(404, {
          message: "UserQuizSetAttempt not found",
        });
      }
      return UserQuizSetAttemptRepository.toEntity(userQuizSetAttempt);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getByUserIdAndQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<UserQuizSetAttemptEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizSetAttempt =
        await this.prisma.userQuizSetAttempt.findUnique({
          where: {
            userId_quizSetId: {
              userId,
              quizSetId,
            },
          },
        });
      if (!userQuizSetAttempt) {
        throw new HTTPException(404, {
          message: "UserQuizSetAttempt not found",
        });
      }
      return UserQuizSetAttemptRepository.toEntity(userQuizSetAttempt);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getByUserId(userId: string): Promise<UserQuizSetAttemptEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizSetAttempts = await this.prisma.userQuizSetAttempt.findMany(
        {
          where: {
            userId,
          },
        },
      );
      return userQuizSetAttempts.map(UserQuizSetAttemptRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getByQuizSetId(quizSetId: string): Promise<UserQuizSetAttemptEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizSetAttempts = await this.prisma.userQuizSetAttempt.findMany(
        {
          where: {
            quizSetId,
          },
        },
      );
      return userQuizSetAttempts.map(UserQuizSetAttemptRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteById(id: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.userQuizSetAttempt.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  static toEntity(
    userQuizSetAttempt: UserQuizSetAttempt,
  ): UserQuizSetAttemptEntity {
    return new UserQuizSetAttemptEntity({
      id: userQuizSetAttempt.id,
      userId: userQuizSetAttempt.userId,
      quizSetId: userQuizSetAttempt.quizSetId,
      lastCorrectQuizzesCount: userQuizSetAttempt.lastCorrectQuizzesCount,
      lastQuizzesScore: userQuizSetAttempt.lastQuizzesScore,
      isCompleted: userQuizSetAttempt.isCompleted,
      createdAt: userQuizSetAttempt.createdAt,
      updatedAt: userQuizSetAttempt.updatedAt,
    });
  }
}
