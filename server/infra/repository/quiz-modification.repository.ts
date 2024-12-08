import { IQuizModificationRepository } from "@server/domain/interface/repository/quiz-modification.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuizModificationEntity } from "@server/domain/entity/quiz-modification.entity";
import { PrismaClient, QuizModification } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class QuizModificationRepository
  extends DBAbstract
  implements IQuizModificationRepository
{
  prisma: PrismaClient | null = null;
  async createQuizModification({
    quizId,
    userId,
    requestType,
    newQuestion,
    newTitle,
    newDescription,
    newAnswer,
    newLevel,
    status,
  }: {
    quizId: string;
    userId: string;
    requestType: string;
    newQuestion?: string;
    newTitle?: string;
    newDescription?: string;
    newAnswer?: string;
    newLevel?: number;
    status: string;
  }): Promise<QuizModificationEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizModification = await this.prisma.quizModification.create({
        data: {
          quizId,
          userId,
          requestType,
          newQuestion,
          newTitle,
          newDescription,
          newAnswer,
          newLevel,
          status,
        },
      });
      return QuizModificationRepository.toEntity(quizModification);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizModificationById(
    id: string,
  ): Promise<QuizModificationEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizModification = await this.prisma.quizModification.findUnique({
        where: { id },
      });
      if (!quizModification) {
        throw new HTTPException(404, {
          message: "Quiz Modification not found",
        });
      }
      return QuizModificationRepository.toEntity(quizModification);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizModificationByQuizId(
    quizId: string,
  ): Promise<QuizModificationEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizModifications = await this.prisma.quizModification.findMany({
        where: { quizId },
      });
      return quizModifications.map(QuizModificationRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuizModificationGotByUserId(
    userId: string,
  ): Promise<QuizModificationEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizModifications = await this.prisma.quizModification.findMany({
        where: { userId },
      });
      return quizModifications.map(QuizModificationRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateQuizModificationById({
    id,
    requestType,
    newQuestion,
    newTitle,
    newDescription,
    newAnswer,
    newLevel,
    status,
  }: {
    id: string;
    requestType: string;
    newQuestion?: string;
    newTitle?: string;
    newDescription?: string;
    newAnswer?: string;
    newLevel?: number;
    status: string;
  }): Promise<QuizModificationEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const quizModification = await this.prisma.quizModification.update({
        where: { id },
        data: {
          requestType,
          newQuestion,
          newTitle,
          newDescription,
          newAnswer,
          newLevel,
          status,
        },
      });
      return QuizModificationRepository.toEntity(quizModification);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteQuizModificationById(id: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.quizModification.delete({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  static toEntity(quizModification: QuizModification): QuizModificationEntity {
    return new QuizModificationEntity({
      id: quizModification.id,
      quizId: quizModification.quizId,
      userId: quizModification.userId,
      requestType: quizModification.requestType,
      newQuestion: quizModification.newQuestion ?? undefined,
      newTitle: quizModification.newTitle ?? undefined,
      newDescription: quizModification.newDescription ?? undefined,
      newAnswer: quizModification.newAnswer ?? undefined,
      newLevel: quizModification.newLevel ?? undefined,
      status: quizModification.status,
      createdAt: quizModification.createdAt,
      updatedAt: quizModification.updatedAt,
    });
  }
}
