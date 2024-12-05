import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IUserQuizSetAttemptRepository extends IDbAbstract {
  create({
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
  }): Promise<UserQuizSetAttemptEntity>;
  update({
    id,
    lastCorrectQuizzesCount,
    lastQuizzesScore,
    isCompleted,
  }: {
    id: string;
    lastCorrectQuizzesCount?: number;
    lastQuizzesScore?: number;
    isCompleted?: boolean;
  }): Promise<UserQuizSetAttemptEntity | null>;
  getById(id: string): Promise<UserQuizSetAttemptEntity | null>;
  getByUserIdAndQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<UserQuizSetAttemptEntity | null>;
  getByQuizSetId(quizSetId: string): Promise<UserQuizSetAttemptEntity[]>;
  getByUserId(userId: string): Promise<UserQuizSetAttemptEntity[]>;
  deleteById(id: string): Promise<void>;
}
