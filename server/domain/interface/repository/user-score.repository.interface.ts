import { UserScoreEntity } from "@server/domain/entity/user-score.entity";
import { IDbAbstract } from "./db.abstract.interface";
import { UserEntity } from "@server/domain/entity/user.entity";

export interface IUserScoreRepository extends IDbAbstract {
  getScoreByUserId(userId: string): Promise<UserScoreEntity | null>;
  updateUserScoreById({
    userId,
    totalScore,
    totalCorrect,
    totalQuizzes,
  }: {
    userId: string;
    totalScore: number;
    totalCorrect: number;
    totalQuizzes: number;
  }): Promise<UserScoreEntity | null>;
  createUserScore({ userId }: { userId: string }): Promise<UserScoreEntity>;
  deleteUserScoreByUserId(userId: string): Promise<UserScoreEntity | null>;
  getTopNUsersScore(n: number): Promise<UserScoreEntity[]>;
  getTopNUsers(n: number): Promise<UserEntity[]>;
  getRankingPositionByUserId(userId: string): Promise<number | null>;
}
