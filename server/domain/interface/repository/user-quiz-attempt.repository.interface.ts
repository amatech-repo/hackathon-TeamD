import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IUserQuizAttemptRepository extends IDbAbstract {
  upsert({
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
  getQuizAttemptById(id: string): Promise<UserQuizAttemptEntity | null>;
  getQuizAttemptByUserId(userId: string): Promise<UserQuizAttemptEntity[]>;
  getQuizAttemptByQuizId(quizId: string): Promise<UserQuizAttemptEntity[]>;
  getQuizAttemptByQuizSetId(
    quizSetId: string,
  ): Promise<UserQuizAttemptEntity[]>;
  deleteQuizAttemptById(id: string): Promise<void>;
}
