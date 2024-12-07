import { QuizEntity } from "@server/domain/entity/quiz.entity";
import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { Context } from "hono";

//Honoの機能の呼び出し(c)なんか便利な物
export async function GetQuizByIdUseCase({
  quizId,
  c,
}: {
  quizId: string;
  c: Context;
}): Promise<QuizEntity> {
  const quizRepository: IQuizRepository = new QuizRepository();
  //awaitは非同期処理を行う時に使う
  await quizRepository.initPrisma(c); //Prismaの準備
  const quizData = await quizRepository.getQuizById(quizId);
  return quizData;
}
