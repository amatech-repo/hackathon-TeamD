import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { IDbAbstract } from "./db.abstract.interface";

export interface IAnswerOptionRepository extends IDbAbstract {
  getAnswerOptionsByQuestionId(
    questionId: string,
  ): Promise<AnswerOptionEntity[]>;
  getAnswerOptionsByAnswerId(answerId: string): Promise<AnswerOptionEntity[]>;
  getAnswerOptionById(id: string): Promise<AnswerOptionEntity | null>;
  getAnswerOptionByQuizId(quizId: string): Promise<AnswerOptionEntity[]>;
  getAnswerOptionByQuizSetId(quizSetId: string): Promise<AnswerOptionEntity[]>;
  getCorrectAnswerOptionByQuizId(quizId: string): Promise<AnswerOptionEntity[]>;
  getCorrectAnswerOptionByQuizSetId(
    quizSetId: string,
  ): Promise<AnswerOptionEntity[]>;
  getCorrectAnswerOptionByAnswerId(
    answerId: string,
  ): Promise<AnswerOptionEntity[]>;

  createAnswerOption({
    answerId,
    option,
    isCorrect,
  }: {
    answerId: string;
    option: string;
    isCorrect: boolean;
  }): Promise<AnswerOptionEntity>;
  createAnswerOptions({
    options,
    answerId,
  }: {
    options: { isCorrect: boolean; option: string }[];
    answerId: string;
  }): Promise<AnswerOptionEntity[]>;
  updateAnswerOption({
    id,
    option,
    isCorrect,
  }: {
    id: string;
    option: string;
    isCorrect: boolean;
  }): Promise<AnswerOptionEntity | null>;
  deleteAnswerOptionById(answerOptionId: string): Promise<void>;
}
