import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { AnswerEntity } from "@server/domain/entity/answer.entity";
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
import { HTTPException } from "hono/http-exception";

export async function UpdateQuizByIdAndUserIdUseCase({
  id,
  level,
  c,
  isPublic,
  creatorId,
  question,
  type,
  options,
}: {
  id: string;
  level: number;
  c: Context;
  isPublic: boolean;
  creatorId: string;
  question: string;
  type: string;
  options: {
    isCorrect: boolean; //createdOptionsの部分
    option: string;
  }[];
}): Promise<{
  quiz: QuizEntity;
  question: QuestionEntity;
  answer: AnswerEntity;
  answerOptions: AnswerOptionEntity[];
}> {
  const quizRepository: IQuizRepository = new QuizRepository();
  const questionRepository: IQuestionRepository = new QuestionRepository();
  const answerRepository: IAnswerRepository = new AnswerRepository();
  const answerOptionRepository: IAnswerOptionRepository =
    new AnswerOptionRepository();
  await quizRepository.initPrisma(c); //環境変数を渡すため
  await questionRepository.initPrisma(c);
  await answerRepository.initPrisma(c);
  await answerOptionRepository.initPrisma(c);
  const createdQuiz = await quizRepository.updateQuizByIdAndUserId({
    id,
    level,
    isPublic,
    creatorId,
  });
  const findQuestion = await questionRepository.getQuestionByQuizId(
    createdQuiz.id,
  );
  if (!findQuestion) {
    throw new HTTPException(404, {
      message: "Question not found",
    });
  }
  const createdQuestion = await questionRepository.updateQuestion({
    id: findQuestion.id,
    question,
  });
  const findAnswer = await answerRepository.getAnswerByQuestionId(
    createdQuestion.id,
  );
  if (!findAnswer) {
    throw new HTTPException(404, {
      message: "Answer not found",
    });
  }
  const createdAnswer = await answerRepository.updateAnswer({
    id: findAnswer.id,
    type: type,
  });
  if (!createdAnswer) {
    throw new HTTPException(404, {
      message: "Answer not found",
    });
  }
  await answerOptionRepository.deleteAnswerOptionByAnserId(createdAnswer.id);
  const cratedAnswerOption = await answerOptionRepository.createAnswerOptions({
    options,
    answerId: createdAnswer.id,
  });
  return {
    quiz: createdQuiz,
    question: createdQuestion,
    answer: createdAnswer,
    answerOptions: cratedAnswerOption,
  };
}
