import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IUserQuizSetAttemptRepository extends IDbAbstract {
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
  }): Promise<UserQuizSetAttemptEntity>;
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
  }): Promise<UserQuizSetAttemptEntity | null>;
  getById(id: string): Promise<UserQuizSetAttemptEntity | null>;
  getByUserIdAndQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<UserQuizSetAttemptEntity | null>;
  getByUserId(userId: string): Promise<UserQuizSetAttemptEntity[]>;
  deleteById(id: string): Promise<void>;
}
