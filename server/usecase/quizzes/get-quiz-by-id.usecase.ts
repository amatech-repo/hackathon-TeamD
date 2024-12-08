import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { QuestionEntity } from "@server/domain/entity/question.entity";
import { QuizEntity } from "@server/domain/entity/quiz.entity";
import { IAnswerOptionRepository } from "@server/domain/interface/repository/answer-option.repository.interface";
import { IAnswerRepository } from "@server/domain/interface/repository/answer.repository.interface";
import { IQuestionRepository } from "@server/domain/interface/repository/question.repository.interface";
import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { AnswerOptionRepository } from "@server/infra/repository/answer-option.repository";
import { AnswerRepository } from "@server/infra/repository/answer.repository";
import { QuestionRepository } from "@server/infra/repository/question.repository";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { Context } from "hono";

//Honoの機能の呼び出し(c)なんか便利な物
export async function GetQuizByIdUseCase({
  quizId,
  c,
}: {
  quizId: string;
  c: Context;
}): Promise<{
  quiz: QuizEntity;
  question: QuestionEntity;
  answerOptions: AnswerOptionEntity[];
}> {
  const quizRepository: IQuizRepository = new QuizRepository();
  const answerOptionRepository: IAnswerOptionRepository =
    new AnswerOptionRepository();
  const questionRepository: IQuestionRepository = new QuestionRepository();
  //awaitは非同期処理を行う時に使う
  await quizRepository.initPrisma(c); //Prismaの準備
  await answerOptionRepository.initPrisma(c);
  await questionRepository.initPrisma(c);
  const quizData = await quizRepository.getQuizById(quizId);
  const answerOptions =
    await answerOptionRepository.getAnswerOptionByQuizId(quizId);
  const questionData = await questionRepository.getQuestionByQuizId(quizId);

  return {
    quiz: quizData,
    question: questionData,
    answerOptions,
  };
}
