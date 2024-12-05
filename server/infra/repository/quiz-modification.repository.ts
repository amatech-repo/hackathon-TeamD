import { IQuizModificationRepository } from "@server/domain/interface/repository/quiz-modification.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { QuizModificationEntity } from "@server/domain/entity/quiz-modification.entity";
import { PrismaClient } from "@prisma/client";

export class QuizModificationRepository
  extends DBAbstract
  implements IQuizModificationRepository
{
  prisma: PrismaClient | null = null;
  createQuizModification({
    quizId,
    userId,
    requestType,
    newQuestion,
    newTitle,
    newDescription,
    newAnswer,
    newLevel,
    status,
  }: {
    quizId: string;
    userId: string;
    requestType: string;
    newQuestion?: string;
    newTitle?: string;
    newDescription?: string;
    newAnswer?: string;
    newLevel?: number;
    status: string;
  }): Promise<QuizModificationEntity> {
    throw new Error("Method not implemented.");
  }
  getQuizModificationById(id: string): Promise<QuizModificationEntity | null> {
    throw new Error("Method not implemented.");
  }
  getQuizModificationByQuizId(
    quizId: string,
  ): Promise<QuizModificationEntity[]> {
    throw new Error("Method not implemented.");
  }
  getQuizModificationGotByUserId(
    userId: string,
  ): Promise<QuizModificationEntity[]> {
    throw new Error("Method not implemented.");
  }
  updateQuizModificationById({
    id,
    requestType,
    newQuestion,
    newTitle,
    newDescription,
    newAnswer,
    newLevel,
    status,
  }: {
    id: string;
    requestType: string;
    newQuestion?: string;
    newTitle?: string;
    newDescription?: string;
    newAnswer?: string;
    newLevel?: number;
    status: string;
  }): Promise<QuizModificationEntity> {
    throw new Error("Method not implemented.");
  }
  deleteQuizModificationById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
