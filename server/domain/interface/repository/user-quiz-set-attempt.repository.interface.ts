import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IUserQuizSetAttemptRepository extends IDbAbstract {
  upsert({
    userId,
    quizSetId,
    lastCorrectQuizzesCount,
    lastQuizzesScore,
    isCompleted,
  }: {
    userId: string;
    quizSetId: string;
    lastCorrectQuizzesCount: number;
    lastQuizzesScore: number;
    isCompleted: boolean;
  }): Promise<UserQuizSetAttemptEntity | null>;
  upsertIncrement({
    userId,
    quizSetId,
    isCompleted,
  }: {
    userId: string;
    quizSetId: string;
    isCompleted: boolean;
  }): Promise<UserQuizSetAttemptEntity>;
  getQuizSetAttemptById(id: string): Promise<UserQuizSetAttemptEntity | null>;
  getQuizSetAttemptByUserIdAndQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<UserQuizSetAttemptEntity | null>;
  getQuizSetAttemptsByQuizSetId(
    quizSetId: string,
  ): Promise<UserQuizSetAttemptEntity[]>;
  getQuizSetAttemptsByUserId(
    userId: string,
  ): Promise<UserQuizSetAttemptEntity[]>;
  deleteById(id: string): Promise<void>;
  deleteByUserIdAndQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<void>;
}
