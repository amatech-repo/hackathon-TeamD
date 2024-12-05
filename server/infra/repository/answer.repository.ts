import { IAnswerRepository } from "@server/domain/interface/repository/answer.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { AnswerEntity } from "@server/domain/entity/answer.entity";
import { PrismaClient } from "@prisma/client";

export class AnswerRepository extends DBAbstract implements IAnswerRepository {
  prisma: PrismaClient | null = null;
  createAnswer({
    questionId,
    type,
  }: {
    questionId: string;
    type: string;
  }): Promise<AnswerEntity> {
    throw new Error("Method not implemented.");
  }
  updateAnswer({
    id,
    type,
  }: {
    id: string;
    type: string;
  }): Promise<AnswerEntity | null> {
    throw new Error("Method not implemented.");
  }
  getAnswerById(id: string): Promise<AnswerEntity | null> {
    throw new Error("Method not implemented.");
  }
  getAnswerByQuestionId(questionId: string): Promise<AnswerEntity | null> {
    throw new Error("Method not implemented.");
  }
  getAnswersByQuizId(quizId: string): Promise<AnswerEntity[]> {
    throw new Error("Method not implemented.");
  }
  getAnswersByQuizSetId(quizSetId: string): Promise<AnswerEntity[]> {
    throw new Error("Method not implemented.");
  }
  deleteAnswerById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
