import { QuizEntity } from "@server/domain/entity/quiz.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IQuizRepository extends IDbAbstract {
  getQuizById(quizId: string): Promise<QuizEntity>;
  createQuiz({
    quizSetId,
    level,
    creatorId,
    isPublic,
  }: {
    quizSetId?: string;
    level: number;
    creatorId: string;
    isPublic: boolean;
  }): Promise<QuizEntity>;
  updateQuizByIdAndUserId({
    id,
    quizSetId,
    level,
    creatorId,
    isPublic,
  }: {
    id: string;
    quizSetId?: string;
    level: number;
    creatorId: string;
    isPublic: boolean;
  }): Promise<QuizEntity>;
  deleteQuizById(quizId: string): Promise<void>;
  deleteQuizzesByQuizSetId({
    userId,
    quizSetId,
  }: {
    userId: string;
    quizSetId: string;
  }): Promise<void>;
  getQuizzesByQuizSetId(quizSetId: string): Promise<QuizEntity[]>;
  getQuizzesByCreatorId(creatorId: string): Promise<QuizEntity[]>;
}
