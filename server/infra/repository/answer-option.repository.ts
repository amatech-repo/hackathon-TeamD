import { IAnswerOptionRepository } from "@server/domain/interface/repository/answer-option.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { PrismaClient } from "@prisma/client";

export class AnswerOptionRepository
  extends DBAbstract
  implements IAnswerOptionRepository
{
  prisma: PrismaClient | null = null;
  getAnswerOptionsByQuestionId(
    questionId: string,
  ): Promise<AnswerOptionEntity[]> {
    throw new Error("Method not implemented.");
  }
  getAnswerOptionsByAnswerId(answerId: string): Promise<AnswerOptionEntity[]> {
    throw new Error("Method not implemented.");
  }
  getAnswerOptionById(id: string): Promise<AnswerOptionEntity | null> {
    throw new Error("Method not implemented.");
  }
  getAnswerOptionByQuizId(quizId: string): Promise<AnswerOptionEntity[]> {
    throw new Error("Method not implemented.");
  }
  getAnswerOptionByQuizSetId(quizSetId: string): Promise<AnswerOptionEntity[]> {
    throw new Error("Method not implemented.");
  }
  getCorrectAnswerOptionByQuizId(
    quizId: string,
  ): Promise<AnswerOptionEntity[]> {
    throw new Error("Method not implemented.");
  }
  getCorrectAnswerOptionByQuizSetId(
    quizSetId: string,
  ): Promise<AnswerOptionEntity[]> {
    throw new Error("Method not implemented.");
  }
  getCorrectAnswerOptionByAnswerId(
    answerId: string,
  ): Promise<AnswerOptionEntity[]> {
    throw new Error("Method not implemented.");
  }
  createAnswerOption({
    answerId,
    option,
    isCorrect,
  }: {
    answerId: string;
    option: string;
    isCorrect: boolean;
  }): Promise<AnswerOptionEntity> {
    throw new Error("Method not implemented.");
  }
  updateAnswerOption({
    id,
    option,
    isCorrect,
  }: {
    id: string;
    option: string;
    isCorrect: boolean;
  }): Promise<AnswerOptionEntity> {
    throw new Error("Method not implemented.");
  }
  deleteAnswerOptionById(answerOptionId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
