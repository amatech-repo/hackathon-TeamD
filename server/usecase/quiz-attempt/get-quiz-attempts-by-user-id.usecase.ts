import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";
import { IQuestionRepository } from "@server/domain/interface/repository/question.repository.interface";
import { IUserQuizAttemptRepository } from "@server/domain/interface/repository/user-quiz-attempt.repository.interface";
import { QuestionRepository } from "@server/infra/repository/question.repository";
import { UserQuizAttemptRepository } from "@server/infra/repository/user-quiz-attempt.repository";
import { Context } from "hono";

export async function GetQuizAttemptsByUserIdUseCase({
  c,
  userId,
}: {
  c: Context;
  userId: string;
}): Promise<
  {
    quizId: string;
    title: string;
    score: number;
  }[]
> {
  const userQuizAttemptRepository: IUserQuizAttemptRepository =
    new UserQuizAttemptRepository();
  const questionRepository: IQuestionRepository = new QuestionRepository();
  await userQuizAttemptRepository.initPrisma(c);
  const quizAttempts =
    await userQuizAttemptRepository.getQuizAttemptByUserId(userId);
  const quizIds = quizAttempts.map((quizAttempt) => quizAttempt.quizId);

  const returnVal: {
    quizId: string;
    title: string;
    score: number;
  }[] = await Promise.all(
    quizAttempts.map(async (quizAttempt) => {
      // あまり良くないコード
      const question = await questionRepository.getQuestionById(
        quizAttempt.quizId,
      );
      return {
        quizId: quizAttempt.quizId,
        title: question.question,
        score: quizAttempt.isCompleted ? 1 : 0,
      };
    }),
  );
  return returnVal;
}
