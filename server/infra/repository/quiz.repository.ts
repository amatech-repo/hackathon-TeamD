import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuizEntity } from "@server/domain/entity/quiz.entity";
import { PrismaClient, Quiz } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class QuizRepository extends DBAbstract implements IQuizRepository {
  prisma: PrismaClient | null = null;
  async getQuizById(quizId: string): Promise<QuizEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quiz = await this.prisma.quiz.findUnique({
        where: {
          id: quizId,
        },
      });
      if (!quiz) {
        throw new HTTPException(404, {
          message: "Quiz not found",
        });
      }
      return QuizRepository.toEntity(quiz);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async createQuiz({
    quizSetId,
    level,
    creatorId,
    isPublic,
  }: {
    quizSetId?: string;
    level: number;
    creatorId: string;
    isPublic: boolean;
  }): Promise<QuizEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quiz = await this.prisma.quiz.create({
        data: {
          quizSetId,
          level,
          creatorId,
          isPublic,
        },
      });
      return QuizRepository.toEntity(quiz);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateQuizByIdAndUserId({
    id,
    quizSetId,
    level,
    creatorId,
    isPublic,
  }: {
    id: string;
    quizSetId?: string;
    level: number;
    creatorId: string;
    isPublic: boolean;
  }): Promise<QuizEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quiz = await this.prisma.quiz.update({
        where: {
          id,
          creatorId: creatorId,
        },
        data: {
          quizSetId,
          level,
          isPublic,
        },
      });
      if (!quiz) {
        throw new HTTPException(404, {
          message: "Quiz not found",
        });
      }
      return QuizRepository.toEntity(quiz);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteQuizById(quizId: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.quiz.delete({
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
  async deleteQuizzesByQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.quiz.deleteMany({
        where: {
          creatorId: userId,
          quizSetId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizzesByQuizSetId(quizSetId: string): Promise<QuizEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizzes = await this.prisma.quiz.findMany({
        where: {
          quizSetId,
        },
      });
      return quizzes.map(QuizRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizzesByCreatorId(creatorId: string): Promise<QuizEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizzes = await this.prisma.quiz.findMany({
        where: {
          creatorId,
        },
      });
      return quizzes.map(QuizRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  static toEntity(quiz: Quiz): QuizEntity {
    return new QuizEntity({
      id: quiz.id,
      quizSetId: quiz.quizSetId ?? undefined,
      level: quiz.level,
      creatorId: quiz.creatorId,
      isPublic: quiz.isPublic,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    });
  }
}
