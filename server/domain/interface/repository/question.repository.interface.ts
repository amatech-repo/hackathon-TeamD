import { QuestionEntity } from "@server/domain/entity/question.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IQuestionRepository extends IDbAbstract {
  createQuestion({
    quizId,
    question,
  }: {
    quizId: string;
    question: string;
  }): Promise<QuestionEntity>;
  updateQuestion({
    id,
    question,
  }: {
    id: string;
    question: string;
  }): Promise<QuestionEntity>;
  getQuestionById(id: string): Promise<QuestionEntity | null>;
  getQuestionsByQuizId(quizId: string): Promise<QuestionEntity[]>;
  getQuestionsByQuizSetId(quizSetId: string): Promise<QuestionEntity[]>;
  deleteQuestionById(id: string): Promise<void>;
}