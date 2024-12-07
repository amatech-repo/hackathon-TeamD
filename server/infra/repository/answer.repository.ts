import { IAnswerRepository } from "@server/domain/interface/repository/answer.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { AnswerEntity } from "@server/domain/entity/answer.entity";
import { Answer, PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class AnswerRepository extends DBAbstract implements IAnswerRepository {
  prisma: PrismaClient | null = null;
  async createAnswer({
    type,
    questionId,
  }: {
    questionId: string;
    type: string;
  }): Promise<AnswerEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answer = await this.prisma.answer.create({
        data: {
          type,
          questionAnswers: {
            create: {
              questionId,
            },
          },
        },
      });
      return AnswerRepository.toEntity(answer);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateAnswer({
    id,
    type,
  }: {
    id: string;
    type: string;
  }): Promise<AnswerEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answer = await this.prisma.answer.update({
        where: {
          id,
        },
        data: {
          type,
        },
      });
      if (!answer) {
        throw new HTTPException(404, {
          message: "Answer not found",
        });
      }
      return AnswerRepository.toEntity(answer);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswerById(id: string): Promise<AnswerEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answer = await this.prisma.answer.findUnique({
        where: {
          id,
        },
      });
      if (!answer) {
        throw new HTTPException(404, {
          message: "Answer not found",
        });
      }
      return AnswerRepository.toEntity(answer);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswerByQuestionId(
    questionId: string,
  ): Promise<AnswerEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answer = await this.prisma.answer.findFirst({
        where: {
          questionAnswers: {
            some: {
              questionId,
            },
          },
        },
      });
      if (!answer) {
        throw new HTTPException(404, {
          message: "Answer not found",
        });
      }
      return AnswerRepository.toEntity(answer);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswersByQuizId(quizId: string): Promise<AnswerEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answers = await this.prisma.answer.findMany({
        where: {
          questionAnswers: {
            some: {
              question: {
                quizId,
              },
            },
          },
        },
      });
      return answers.map(AnswerRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswersByQuizSetId(quizSetId: string): Promise<AnswerEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answers = await this.prisma.answer.findMany({
        where: {
          questionAnswers: {
            some: {
              question: {
                quiz: {
                  quizSetId,
                },
              },
            },
          },
        },
      });
      return answers.map(AnswerRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteAnswerById(id: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.answer.delete({
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
  static toEntity(answer: Answer): AnswerEntity {
    return new AnswerEntity({
      id: answer.id,
      type: answer.type,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    });
  }
}
