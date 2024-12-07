import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";
import { IUserQuizAttemptRepository } from "@server/domain/interface/repository/user-quiz-attempt.repository.interface";
import { UserQuizAttemptRepository } from "@server/infra/repository/user-quiz-attempt.repository";
import { Context } from "hono";

export async function GetQuizAttemptsByUserIdUseCase({
  c,
  userId,
}: {
  c: Context;
  userId: string;
}): Promise<UserQuizAttemptEntity[]> {
  const userQuizAttemptRepository: IUserQuizAttemptRepository =
    new UserQuizAttemptRepository();
  await userQuizAttemptRepository.initPrisma(c);
  const quizAttempts =
    await userQuizAttemptRepository.getQuizAttemptByUserId(userId);
  return quizAttempts;
}
