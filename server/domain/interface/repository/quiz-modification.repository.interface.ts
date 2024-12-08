import { QuizModificationEntity } from "@server/domain/entity/quiz-modification.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IQuizModificationRepository extends IDbAbstract {
  createQuizModification({
    quizId,
    userId,
    requestType,
    newQuestion,
    newTitle,
    newDescription,
    newAnswer,
    newLevel,
    status,
  }: {
    quizId: string;
    userId: string;
    requestType: string;
    newQuestion?: string;
    newTitle?: string;
    newDescription?: string;
    newAnswer?: string;
    newLevel?: number;
    status: string;
  }): Promise<QuizModificationEntity>;
  getQuizModificationById(id: string): Promise<QuizModificationEntity | null>;
  // クイズの中のQuizModificationEntityを持ってくる
  getQuizModificationByQuizId(
    quizId: string,
  ): Promise<QuizModificationEntity[]>;
  // ユーザー側にまとめて送られたクイズの中のQuizModificationEntityを持ってくる(ユーザーの作ったクイズから)
  getQuizModificationGotByUserId(
    userId: string,
  ): Promise<QuizModificationEntity[]>;
  updateQuizModificationById({
    id,
    requestType,
    newQuestion,
    newTitle,
    newDescription,
    newAnswer,
    newLevel,
    status,
  }: {
    id: string;
    requestType: string;
    newQuestion?: string;
    newTitle?: string;
    newDescription?: string;
    newAnswer?: string;
    newLevel?: number;
    status: string;
  }): Promise<QuizModificationEntity>;
  deleteQuizModificationById(id: string): Promise<void>;
}
