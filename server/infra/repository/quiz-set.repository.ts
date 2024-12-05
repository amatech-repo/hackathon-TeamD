import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { PrismaClient } from "@prisma/client";

export class QuizSetRepository
  extends DBAbstract
  implements IQuizSetRepository
{
  prisma: PrismaClient | null = null;
  getQuizSetById(quizId: string): Promise<QuizSetEntity> {
    throw new Error("Method not implemented.");
  }
  createQuizSet({
    title,
    description,
    level,
    creatorId,
    isPublic,
  }: {
    title: string;
    description?: string;
    level: number;
    creatorId: string;
    isPublic: boolean;
  }): Promise<QuizSetEntity> {
    throw new Error("Method not implemented.");
  }
  updateQuizSetById({
    id,
    title,
    description,
    level,
    isPublic,
  }: {
    id: string;
    title?: string;
    description?: string;
    level?: number;
    isPublic?: boolean;
  }): Promise<QuizSetEntity> {
    throw new Error("Method not implemented.");
  }
  getQuizSetsByCreatorId(creatorId: string): Promise<QuizSetEntity[]> {
    throw new Error("Method not implemented.");
  }
  deleteQuizSetById(quizId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
