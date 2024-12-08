import { IQuestionAnswerRepository } from "@server/domain/interface/repository/question-answer.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuestionAnswerEntity } from "@server/domain/entity/question-answer.entity";
import { PrismaClient, QuestionAnswer } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class QuestionAnswerRepository
  extends DBAbstract
  implements IQuestionAnswerRepository
{
  prisma: PrismaClient | null = null;
  public async createQuestionAnswer({
    questionId,
    answerId,
  }: {
    questionId: string;
    answerId: string;
  }): Promise<QuestionAnswerEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const questionAnswer = await this.prisma.questionAnswer.create({
        data: {
          questionId,
          answerId,
        },
      });
      return QuestionAnswerRepository.toEntity(questionAnswer);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  static toEntity(questionAnswer: QuestionAnswer): QuestionAnswerEntity {
    return new QuestionAnswerEntity({
      id: questionAnswer.id,
      questionId: questionAnswer.questionId,
      answerId: questionAnswer.answerId,
    });
  }
}
