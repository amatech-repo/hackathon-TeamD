import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { UserQuizSetAttemptRepository } from "@server/infra/repository/user-quiz-set-attempt.repository";
import { Context } from "hono";

export async function GetQuizSetAttemptsByQuizSetIdUseCase({
  quizSetId,
  c,
}: {
  quizSetId: string;
  c: Context;
}): Promise<UserQuizSetAttemptEntity[]> {
  const userQuizSetAttemptRepository: IUserQuizSetAttemptRepository =
    new UserQuizSetAttemptRepository();
  await userQuizSetAttemptRepository.initPrisma(c);
  return await userQuizSetAttemptRepository.getQuizSetAttemptsByUserId(
    quizSetId,
  );
}
