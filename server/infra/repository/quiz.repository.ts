import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuizEntity } from "@server/domain/entity/quiz.entity";
import { PrismaClient } from "@prisma/client";

export class QuizRepository extends DBAbstract implements IQuizRepository {
  prisma: PrismaClient | null = null;
  getQuizById(quizId: string): Promise<QuizEntity> {
    throw new Error("Method not implemented.");
  }
  createQuiz({
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
    throw new Error("Method not implemented.");
  }
  updateQuizById({
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
    throw new Error("Method not implemented.");
  }
  deleteQuizById(quizId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getQuizzesByQuizSetId(quizSetId: string): Promise<QuizEntity[]> {
    throw new Error("Method not implemented.");
  }
  getQuizzesByCreatorId(creatorId: string): Promise<QuizEntity[]> {
    throw new Error("Method not implemented.");
  }
}
