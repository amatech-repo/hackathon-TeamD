import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { UserQuizSetAttemptRepository } from "@server/infra/repository/user-quiz-set-attempt.repository";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function GetQuizSetAttemptByQuizSetIdAndUserIdUseCase({
  quizSetId,
  userId,
  c,
}: {
  quizSetId: string;
  userId: string;
  c: Context;
}): Promise<UserQuizSetAttemptEntity> {
  const userQuizSetAttemptRepository: IUserQuizSetAttemptRepository =
    new UserQuizSetAttemptRepository();
  userQuizSetAttemptRepository.initPrisma(c);
  const quizSetAttemptEntity =
    await userQuizSetAttemptRepository.getQuizSetAttemptByUserIdAndQuizSetId({
      quizSetId,
      userId,
    });
  if (!quizSetAttemptEntity) {
    throw new HTTPException(404, {
      message: "Quiz attempt not found",
    });
  }
  return quizSetAttemptEntity;
}
