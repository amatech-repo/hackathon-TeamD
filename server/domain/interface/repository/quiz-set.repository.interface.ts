import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IQuizSetRepository extends IDbAbstract {
  getQuizSetById(quizId: string): Promise<QuizSetEntity>;
  createQuizSet({
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
  }): Promise<QuizSetEntity>;
  updateQuizSetById({
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
  }): Promise<QuizSetEntity>;
  updateQuizSetByIdAndUserId({
    id,
    creatorId,
    title,
    description,
    level,
    isPublic,
  }: {
    id: string;
    title?: string;
    creatorId: string;
    description?: string;
    level?: number;
    isPublic?: boolean;
  }): Promise<QuizSetEntity>;
  getQuizSetsByCreatorId(creatorId: string): Promise<QuizSetEntity[]>;
  deleteQuizSetById(quizId: string): Promise<void>;
  deleteQuizSetByIdAndUserId({
    quizSetId,
    userId,
  }: {
    quizSetId: string;
    userId: string;
  }): Promise<void>;
}
