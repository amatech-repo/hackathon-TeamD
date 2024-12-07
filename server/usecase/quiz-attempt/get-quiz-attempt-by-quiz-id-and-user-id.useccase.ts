import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";
import { IUserQuizAttemptRepository } from "@server/domain/interface/repository/user-quiz-attempt.repository.interface";
import { UserQuizAttemptRepository } from "@server/infra/repository/user-quiz-attempt.repository";
import { Context } from "hono";

export async function GetQuizAttemptByQuizIdAndUserIdUseCase({
  quizId,
  userId,
  c,
}: {
  quizId: string;
  userId: string;
  c: Context;
}): Promise<UserQuizAttemptEntity> {
  const userQuizAttemptRepository: IUserQuizAttemptRepository =
    new UserQuizAttemptRepository();
  userQuizAttemptRepository.initPrisma(c);
  return await userQuizAttemptRepository.getQuizAttemptByUserIdAndQuizId({
    quizId,
    userId,
  });
}
