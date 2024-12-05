import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { PrismaClient } from "@prisma/client";

export class UserQuizSetAttemptRepository
  extends DBAbstract
  implements IUserQuizSetAttemptRepository
{
  prisma: PrismaClient | null = null;
  create({
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
  }): Promise<UserQuizSetAttemptEntity> {
    throw new Error("Method not implemented.");
  }
  update({
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
  }): Promise<UserQuizSetAttemptEntity | null> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<UserQuizSetAttemptEntity | null> {
    throw new Error("Method not implemented.");
  }
  getByUserIdAndQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<UserQuizSetAttemptEntity | null> {
    throw new Error("Method not implemented.");
  }
  getByUserId(userId: string): Promise<UserQuizSetAttemptEntity[]> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
