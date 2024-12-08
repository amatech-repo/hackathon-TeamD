import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { UserQuizSetAttemptRepository } from "@server/infra/repository/user-quiz-set-attempt.repository";
import { Context } from "hono";

export async function GetQuizSetAttemptsByUserIdUseCase({
  c,
  userId,
}: {
  c: Context;
  userId: string;
}): Promise<UserQuizSetAttemptEntity[]> {
  const userQuizSetAttemptRepository: IUserQuizSetAttemptRepository =
    new UserQuizSetAttemptRepository();
  await userQuizSetAttemptRepository.initPrisma(c);
  const quizAttempts =
    await userQuizSetAttemptRepository.getQuizSetAttemptsByUserId(userId);
  return quizAttempts;
}
