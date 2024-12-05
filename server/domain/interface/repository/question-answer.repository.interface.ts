import { QuestionAnswerEntity } from "@server/domain/entity/question-answer.entity";
import { IDbAbstract } from "./db.abstract.interface";

// 中間テーブル
export interface IQuestionAnswerRepository extends IDbAbstract {
  createQuestionAnswer({
    questionId,
    answerId,
  }: {
    questionId: string;
    answerId: string;
  }): Promise<QuestionAnswerEntity>;
}
