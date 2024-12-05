import { IUserQuizAttemptRepository } from "@server/domain/interface/repository/user-quiz-attempt.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attemp.entity";
import { PrismaClient } from "@prisma/client";

export class UserQuizAttemptRepository
  extends DBAbstract
  implements IUserQuizAttemptRepository
{
  prisma: PrismaClient | null = null;
  createQuizAttempt({
    userId,
    quizId,
    isCompleted,
    lastSelectedAnswerOptionId,
    userQuizSetAttemptId,
  }: {
    userId: string;
    quizId: string;
    isCompleted: boolean;
    lastSelectedAnswerOptionId?: string;
    userQuizSetAttemptId?: string;
  }): Promise<UserQuizAttemptEntity> {
    throw new Error("Method not implemented.");
  }
  updateQuizAttemptById({
    id,
    isCompleted,
    lastSelectedAnswerOptionId,
    userQuizSetAttemptId,
  }: {
    id: string;
    isCompleted: boolean;
    lastSelectedAnswerOptionId?: string;
    userQuizSetAttemptId?: string;
  }): Promise<UserQuizAttemptEntity | null> {
    throw new Error("Method not implemented.");
  }
  getQuizAttemptById(id: string): Promise<UserQuizAttemptEntity | null> {
    throw new Error("Method not implemented.");
  }
  getQuizAttemptByUserId(userId: string): Promise<UserQuizAttemptEntity[]> {
    throw new Error("Method not implemented.");
  }
  getQuizAttemptByQuizId(quizId: string): Promise<UserQuizAttemptEntity[]> {
    throw new Error("Method not implemented.");
  }
  getQuizAttemptByQuizSetId(
    quizSetId: string,
  ): Promise<UserQuizAttemptEntity[]> {
    throw new Error("Method not implemented.");
  }
  deleteQuizAttemptById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
