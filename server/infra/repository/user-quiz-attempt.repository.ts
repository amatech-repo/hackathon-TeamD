import { IUserQuizAttemptRepository } from "@server/domain/interface/repository/user-quiz-attempt.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { PrismaClient, UserQuizAttempt } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";

export class UserQuizAttemptRepository
  extends DBAbstract
  implements IUserQuizAttemptRepository
{
  prisma: PrismaClient | null = null;
  async createQuizAttempt({
    userId,
    quizId,
    isCompleted,
    lastSelectedAnswerOptionId,
    userQuizSetAttemptId,
  }: {
    userId: string;
    quizId: string;
    isCompleted: boolean;
    lastSelectedAnswerOptionId?: string;
    userQuizSetAttemptId?: string;
  }): Promise<UserQuizAttemptEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizAttempt = await this.prisma.userQuizAttempt.create({
        data: {
          userId,
          quizId,
          isCompleted,
          lastSelectedAnswerOptionId,
          userQuizSetAttemptId,
        },
      });
      return UserQuizAttemptRepository.toEntity(userQuizAttempt);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateQuizAttemptById({
    id,
    isCompleted,
    lastSelectedAnswerOptionId,
    userQuizSetAttemptId,
  }: {
    id: string;
    isCompleted: boolean;
    lastSelectedAnswerOptionId?: string;
    userQuizSetAttemptId?: string;
  }): Promise<UserQuizAttemptEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizAttempt = await this.prisma.userQuizAttempt.update({
        where: {
          id,
        },
        data: {
          isCompleted,
          lastSelectedAnswerOptionId,
          userQuizSetAttemptId,
        },
      });
      if (!userQuizAttempt) {
        throw new HTTPException(404, {
          message: "UserQuizAttempt not found",
        });
      }
      return UserQuizAttemptRepository.toEntity(userQuizAttempt);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizAttemptById(id: string): Promise<UserQuizAttemptEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizAttempt = await this.prisma.userQuizAttempt.findUnique({
        where: {
          id,
        },
      });
      if (!userQuizAttempt) {
        throw new HTTPException(404, {
          message: "UserQuizAttempt not found",
        });
      }
      return UserQuizAttemptRepository.toEntity(userQuizAttempt);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizAttemptByUserId(
    userId: string,
  ): Promise<UserQuizAttemptEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizAttempts = await this.prisma.userQuizAttempt.findMany({
        where: {
          userId,
        },
      });
      return userQuizAttempts.map(UserQuizAttemptRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizAttemptByQuizId(
    quizId: string,
  ): Promise<UserQuizAttemptEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizAttempts = await this.prisma.userQuizAttempt.findMany({
        where: {
          quizId,
        },
      });
      return userQuizAttempts.map(UserQuizAttemptRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizAttemptByQuizSetId(
    quizSetId: string,
  ): Promise<UserQuizAttemptEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userQuizAttempts = await this.prisma.userQuizAttempt.findMany({
        where: {
          quiz: {
            quizSetId,
          },
        },
      });
      return userQuizAttempts.map(UserQuizAttemptRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteQuizAttemptById(id: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
    await this.prisma.userQuizAttempt.delete({
      where: {
        id,
      },
    });
  }
  static toEntity(userQuizAttempt: UserQuizAttempt): UserQuizAttemptEntity {
    return new UserQuizAttemptEntity({
      id: userQuizAttempt.id,
      userId: userQuizAttempt.userId,
      quizId: userQuizAttempt.quizId,
      isCompleted: userQuizAttempt.isCompleted,
      lastSelectedAnswerOptionId:
        userQuizAttempt.lastSelectedAnswerOptionId ?? undefined,
      userQuizSetAttemptId: userQuizAttempt.userQuizSetAttemptId ?? undefined,
      createdAt: userQuizAttempt.createdAt,
      updatedAt: userQuizAttempt.updatedAt,
    });
  }
}
