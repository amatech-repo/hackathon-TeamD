import { AnswerEntity } from "@server/domain/entity/answer.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IAnswerRepository extends IDbAbstract {
  createAnswer({
    type,
    questionId,
  }: {
    questionId: string;
    type: string;
  }): Promise<AnswerEntity>;
  updateAnswer({
    id,
    type,
  }: {
    id: string;
    type: string;
  }): Promise<AnswerEntity | null>;
  getAnswerById(id: string): Promise<AnswerEntity | null>;
  getAnswerByQuestionId(questionId: string): Promise<AnswerEntity | null>;
  getAnswerByQuizId(quizId: string): Promise<AnswerEntity | null>;
  getAnswersByQuizSetId(quizSetId: string): Promise<AnswerEntity[]>;
  deleteAnswerById(id: string): Promise<void>;
  deleteAnswerByQuizSetIdAndUserId({
    quizSetId,
    userId,
  }: {
    quizSetId: string;
    userId: string;
  }): Promise<void>;
}
