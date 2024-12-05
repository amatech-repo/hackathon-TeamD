import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { AnswerEntity } from "@server/domain/entity/answer.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IAnswerRepository extends IDbAbstract {
  createAnswer({
    questionId,
    type,
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
  getAnswersByQuizId(quizId: string): Promise<AnswerEntity[]>;
  getAnswersByQuizSetId(quizSetId: string): Promise<AnswerEntity[]>;
  deleteAnswerById(id: string): Promise<void>;
}
