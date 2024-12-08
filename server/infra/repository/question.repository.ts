import { IQuestionRepository } from "@server/domain/interface/repository/question.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuestionEntity } from "@server/domain/entity/question.entity";
import { PrismaClient, Question } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class QuestionRepository
  extends DBAbstract
  implements IQuestionRepository
{
  prisma: PrismaClient | null = null;
  async createQuestion({
    quizId,
    question,
  }: {
    quizId: string;
    question: string;
  }): Promise<QuestionEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const newQuestion = await this.prisma.question.create({
        data: {
          quizId,
          question,
        },
      });
      return QuestionRepository.toEntity(newQuestion);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateQuestion({
    id,
    question,
  }: {
    id: string;
    question: string;
  }): Promise<QuestionEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const updatedQuestion = await this.prisma.question.update({
        where: {
          id,
        },
        data: {
          question,
        },
      });
      if (!updatedQuestion) {
        throw new HTTPException(404, {
          message: "Question not found",
        });
      }
      return QuestionRepository.toEntity(updatedQuestion);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuestionById(id: string): Promise<QuestionEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const question = await this.prisma.question.findUnique({
        where: {
          id,
        },
      });
      if (!question) {
        throw new HTTPException(404, {
          message: "Question not found",
        });
      }
      return QuestionRepository.toEntity(question);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuestionByQuizId(quizId: string): Promise<QuestionEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const question = await this.prisma.question.findFirst({
        where: {
          quizId,
        },
      });
      if (!question) {
        throw new HTTPException(404, {
          message: "Question not found",
        });
      }
      return QuestionRepository.toEntity(question);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getQuestionsByQuizSetId(quizSetId: string): Promise<QuestionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const questions = await this.prisma.question.findMany({
        where: {
          quiz: {
            quizSetId,
          },
        },
      });
      return questions.map(QuestionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteQuestionById(id: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.question.delete({
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
  async deleteQuestionByIdAndUserId({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.question.delete({
        where: {
          id,
          quiz: {
            quizSet: {
              creatorId: userId,
            },
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
  static toEntity(question: Question): QuestionEntity {
    return new QuestionEntity({
      id: question.id,
      quizId: question.quizId,
      question: question.question,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    });
  }
}
