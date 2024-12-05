import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { PrismaClient, QuizSet } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class QuizSetRepository
  extends DBAbstract
  implements IQuizSetRepository
{
  prisma: PrismaClient | null = null;
  async getQuizSetById(quizId: string): Promise<QuizSetEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizSet = await this.prisma.quizSet.findUnique({
        where: {
          id: quizId,
        },
      });
      if (!quizSet) {
        throw new HTTPException(404, {
          message: "QuizSet not found",
        });
      }
      return QuizSetRepository.toEntity(quizSet);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async createQuizSet({
    title,
    description,
    level,
    creatorId,
    isPublic,
  }: {
    title: string;
    description?: string;
    level: number;
    creatorId: string;
    isPublic: boolean;
  }): Promise<QuizSetEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizSet = await this.prisma.quizSet.create({
        data: {
          title,
          description,
          level,
          creatorId,
          isPublic,
        },
      });
      return QuizSetRepository.toEntity(quizSet);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateQuizSetById({
    id,
    title,
    description,
    level,
    isPublic,
  }: {
    id: string;
    title?: string;
    description?: string;
    level?: number;
    isPublic?: boolean;
  }): Promise<QuizSetEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizSet = await this.prisma.quizSet.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          level,
          isPublic,
        },
      });
      if (!quizSet) {
        throw new HTTPException(404, {
          message: "QuizSet not found",
        });
      }
      return QuizSetRepository.toEntity(quizSet);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizSetsByCreatorId(creatorId: string): Promise<QuizSetEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizSets = await this.prisma.quizSet.findMany({
        where: {
          creatorId,
        },
      });
      return quizSets.map(QuizSetRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteQuizSetById(quizId: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.quizSet.delete({
        where: {
          id: quizId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  static toEntity(quizSet: QuizSet): QuizSetEntity {
    return new QuizSetEntity({
      id: quizSet.id,
      title: quizSet.title,
      description: quizSet.description ?? undefined,
      level: quizSet.level,
      creatorId: quizSet.creatorId,
      isPublic: quizSet.isPublic,
      createdAt: quizSet.createdAt,
      updatedAt: quizSet.updatedAt,
    });
  }
}
