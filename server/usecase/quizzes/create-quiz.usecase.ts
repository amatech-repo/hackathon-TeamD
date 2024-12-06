import { createAdaptorServer } from "@hono/node-server";
import { IAnswerOptionRepository } from "@server/domain/interface/repository/answer-option.repository.interface";
import { IAnswerRepository } from "@server/domain/interface/repository/answer.repository.interface";
import { IQuestionRepository } from "@server/domain/interface/repository/question.repository.interface";
import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { AnswerOptionRepository } from "@server/infra/repository/answer-option.repository";
import { AnswerRepository } from "@server/infra/repository/answer.repository";
import { QuestionRepository } from "@server/infra/repository/question.repository";
import { QuizModificationRepository } from "@server/infra/repository/quiz-modification.repository";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { Context } from "hono";

export async function CreateQuizUseCase({
  level,
  c,
  isPublic,
  creatorId,
  question,
  type,
}: {
  level: number;
  c: Context;
  isPublic: boolean;
  creatorId: string;
  question: string;
  type: string;
}) {
  const quizRepository: IQuizRepository = new QuizRepository();
  const questionRepository: IQuestionRepository = new QuestionRepository();
  const answerRepository: IAnswerRepository = new AnswerRepository();
  const answerOptionRepository: IAnswerOptionRepository =
    new AnswerOptionRepository();
  await quizRepository.initPrisma(c); //環境変数を渡すため
  await questionRepository.initPrisma(c);
  await answerRepository.initPrisma(c);
  await answerOptionRepository.initPrisma(c);
  const createdQuiz = await quizRepository.createQuiz({
    level,
    isPublic,
    creatorId,
  });
  const createdQuestion = await questionRepository.createQuestion({
    quizId: createdQuiz.id,
    question,
  });
  const createdAnswer = await answerRepository.createAnswer({
    questionId: createdQuestion.id,
    type: type,
  });
}
