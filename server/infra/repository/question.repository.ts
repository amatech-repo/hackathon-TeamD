import { IQuestionRepository } from "@server/domain/interface/repository/question.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuestionEntity } from "@server/domain/entity/question.entity";
import { PrismaClient } from "@prisma/client";

export class QuestionRepository
  extends DBAbstract
  implements IQuestionRepository
{
  prisma: PrismaClient | null = null;
  createQuestion({
    quizId,
    question,
  }: {
    quizId: string;
    question: string;
  }): Promise<QuestionEntity> {
    throw new Error("Method not implemented.");
  }
  updateQuestion({
    id,
    question,
  }: {
    id: string;
    question: string;
  }): Promise<QuestionEntity> {
    throw new Error("Method not implemented.");
  }
  getQuestionById(id: string): Promise<QuestionEntity | null> {
    throw new Error("Method not implemented.");
  }
  getQuestionsByQuizId(quizId: string): Promise<QuestionEntity[]> {
    throw new Error("Method not implemented.");
  }
  getQuestionsByQuizSetId(quizSetId: string): Promise<QuestionEntity[]> {
    throw new Error("Method not implemented.");
  }
  deleteQuestionById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
