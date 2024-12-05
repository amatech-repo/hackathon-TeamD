import { IQuestionAnswerRepository } from "@server/domain/interface/repository/question-answer.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuestionAnswerEntity } from "@server/domain/entity/question-answer.entity";
import { PrismaClient } from "@prisma/client";

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
    throw new Error("Method not implemented.");
  }
}
