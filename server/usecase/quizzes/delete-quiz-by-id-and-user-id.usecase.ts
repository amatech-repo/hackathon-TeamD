import { IAnswerRepository } from "@server/domain/interface/repository/answer.repository.interface";
import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { AnswerRepository } from "@server/infra/repository/answer.repository";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function DeleteQuizByIdAndUserIdUseCase({
  quizId,
  creatorId,
  c,
}: {
  quizId: string;
  creatorId: string;
  c: Context;
}) {
  const quizRepository: IQuizRepository = new QuizRepository();
  const answerRepository: IAnswerRepository = new AnswerRepository();
  await quizRepository.initPrisma(c);
  await answerRepository.initPrisma(c);
  const gotQuiz = await quizRepository.getQuizById(quizId);
  const deletedAnswerId = await answerRepository.getAnswerByQuizId(quizId);
  if (!deletedAnswerId) {
    throw new HTTPException(404, {
      message: "Answer not found",
    });
  }
  if (gotQuiz.creatorId !== creatorId) {
    throw new HTTPException(403, {
      message: "Forbidden",
    });
  }
  await quizRepository.deleteQuizById(quizId);
  await answerRepository.deleteAnswerById(deletedAnswerId.id);
}
