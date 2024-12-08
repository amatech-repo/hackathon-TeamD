import { UserScoreEntity } from "@server/domain/entity/user-score.entity";
import { DBAbstract } from "./db.abstract.repository";
import { IUserScoreRepository } from "@server/domain/interface/repository/user-score.repository.interface";
import { PrismaClient, UserScore } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { UserEntity } from "@server/domain/entity/user.entity";
import { UserRepository } from "./user.repository";

export class UserScoreRepository
  extends DBAbstract
  implements IUserScoreRepository
{
  prisma: PrismaClient | null = null;
  async getScoreByUserId(userId: string): Promise<UserScoreEntity | null> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const score = await this.prisma.userScore.findFirst({
        where: {
          userId,
        },
      });
      if (!score) {
        return null;
      }
      return this.toEntity(score);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateUserScoreById({
    userId,
    totalScore,
    totalCorrect,
    totalQuizzes,
  }: {
    userId: string;
    totalScore: number;
    totalCorrect: number;
    totalQuizzes: number;
  }): Promise<UserScoreEntity | null> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const targetScore = await this.prisma.userScore.findFirst({
        where: { userId },
      });
      if (!targetScore) {
        return null;
      }
      const score = await this.prisma.userScore.update({
        where: {
          id: targetScore.id,
        },
        data: {
          totalScore,
          totalCorrect,
          totalQuizzes,
        },
      });
      if (!score) {
        return null;
      }
      return this.toEntity(score);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async createUserScore({
    userId,
  }: {
    userId: string;
  }): Promise<UserScoreEntity> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const score = await this.prisma.userScore.create({
        data: {
          userId,
        },
      });
      return this.toEntity(score);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteUserScoreByUserId(userId: string): Promise<null> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.userScore.deleteMany({
        where: {
          userId,
        },
      });
      return null;
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getTopNUsersScore(n: number): Promise<UserScoreEntity[]> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const scores = await this.prisma.userScore.findMany({
        take: n,
        orderBy: {
          totalScore: "desc",
        },
      });
      return scores.map(this.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getTopNUsers(n: number): Promise<UserEntity[]> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const scores = await this.prisma.userScore.findMany({
        take: n,
        orderBy: {
          totalScore: "desc",
        },
        select: {
          user: true,
        },
      });
      return scores.map((score) => UserRepository.toEntity(score.user));
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getRankingPositionByUserId(userId: string): Promise<number | null> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const userScore = await this.prisma.userScore.findFirst({
        where: { userId },
      });

      if (!userScore) {
        return null; // ユーザーが見つからなかった場合
      }
      // ユーザーのスコアよりも高いスコアを持つユーザーの数を取得 (例えば、ユーザーが一人の時は0が帰るので+1して1位とする)
      const rankingPositionIndex = await this.prisma.userScore.count({
        where: {
          totalScore: {
            gt: userScore.totalScore,
          },
        },
      });
      const rank = rankingPositionIndex + 1;
      return rank;
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  private toEntity(user: UserScore): UserScoreEntity {
    return new UserScoreEntity({
      id: user.id,
      userId: user.userId,
      totalScore: user.totalScore,
      totalCorrect: user.totalCorrect,
      totalQuizzes: user.totalQuizzes,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  }
}
