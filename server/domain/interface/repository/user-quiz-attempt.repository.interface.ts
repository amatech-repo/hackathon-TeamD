import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IUserQuizAttemptRepository extends IDbAbstract {
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
  }): Promise<UserQuizAttemptEntity>;
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
  }): Promise<UserQuizAttemptEntity | null>;
  getQuizAttemptById(id: string): Promise<UserQuizAttemptEntity | null>;
  getQuizAttemptByUserId(userId: string): Promise<UserQuizAttemptEntity[]>;
  getQuizAttemptByQuizId(quizId: string): Promise<UserQuizAttemptEntity[]>;
  getQuizAttemptByQuizSetId(
    quizSetId: string,
  ): Promise<UserQuizAttemptEntity[]>;
  deleteQuizAttemptById(id: string): Promise<void>;
}
