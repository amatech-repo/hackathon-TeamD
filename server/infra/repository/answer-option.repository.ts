import { IAnswerOptionRepository } from "@server/domain/interface/repository/answer-option.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { AnswerOption, PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class AnswerOptionRepository
  extends DBAbstract
  implements IAnswerOptionRepository
{
  prisma: PrismaClient | null = null;
  async getAnswerOptionsByQuestionId(
    questionId: string,
  ): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findMany({
        where: {
          answer: {
            questionAnswers: {
              some: {
                questionId,
              },
            },
          },
        },
      });
      return answerOption.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswerOptionsByAnswerId(
    answerId: string,
  ): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findMany({
        where: {
          answerId,
        },
      });
      return answerOption.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswerOptionById(id: string): Promise<AnswerOptionEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findUnique({
        where: {
          id,
        },
      });
      if (!answerOption) {
        throw new HTTPException(404, {
          message: "AnswerOption not found",
        });
      }
      return AnswerOptionRepository.toEntity(answerOption);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswerOptionByQuizId(quizId: string): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findMany({
        where: {
          answer: {
            questionAnswers: {
              some: {
                question: {
                  quizId,
                },
              },
            },
          },
        },
      });
      return answerOption.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getAnswerOptionByQuizSetId(
    quizSetId: string,
  ): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findMany({
        where: {
          answer: {
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
        },
      });
      return answerOption.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getCorrectAnswerOptionByQuizId(
    quizId: string,
  ): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findMany({
        where: {
          answer: {
            questionAnswers: {
              some: {
                question: {
                  quizId,
                },
              },
            },
          },
          isCorrect: true,
        },
      });
      return answerOption.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getCorrectAnswerOptionByQuizSetId(
    quizSetId: string,
  ): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findMany({
        where: {
          answer: {
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
          isCorrect: true,
        },
      });
      return answerOption.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getCorrectAnswerOptionByAnswerId(
    answerId: string,
  ): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.findMany({
        where: {
          answerId,
          isCorrect: true,
        },
      });
      return answerOption.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async createAnswerOption({
    answerId,
    option,
    isCorrect,
  }: {
    answerId: string;
    option: string;
    isCorrect: boolean;
  }): Promise<AnswerOptionEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.create({
        data: {
          answerId,
          option,
          isCorrect,
        },
      });
      return AnswerOptionRepository.toEntity(answerOption);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async createAnswerOptions({
    options,
    answerId,
  }: {
    options: { isCorrect: boolean; option: string }[];
    answerId: string;
  }): Promise<AnswerOptionEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOptions = await this.prisma.answerOption.createManyAndReturn({
        data: options.map((option) => ({
          answerId,
          option: option.option,
          isCorrect: option.isCorrect,
        })),
      });
      return answerOptions.map(AnswerOptionRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateAnswerOption({
    id,
    option,
    isCorrect,
  }: {
    id: string;
    option: string;
    isCorrect: boolean;
  }): Promise<AnswerOptionEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const answerOption = await this.prisma.answerOption.update({
        where: {
          id,
        },
        data: {
          option,
          isCorrect,
        },
      });
      if (!answerOption) {
        throw new HTTPException(404, {
          message: "AnswerOption not found",
        });
      }
      return AnswerOptionRepository.toEntity(answerOption);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteAnswerOptionById(answerOptionId: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.answerOption.delete({
        where: {
          id: answerOptionId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteAnswerOptionByAnserId(answerId: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.answerOption.deleteMany({
        where: {
          answerId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  static toEntity(answerOption: AnswerOption): AnswerOptionEntity {
    return new AnswerOptionEntity({
      id: answerOption.id,
      answerId: answerOption.answerId,
      option: answerOption.option,
      isCorrect: answerOption.isCorrect,
      createdAt: answerOption.createdAt,
      updatedAt: answerOption.updatedAt,
    });
  }
}
