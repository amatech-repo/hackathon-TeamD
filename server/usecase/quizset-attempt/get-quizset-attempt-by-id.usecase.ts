import { UserQuizSetAttemptEntity } from "@server/domain/entity/user-quiz-set-attempt.entity";
import { IUserQuizSetAttemptRepository } from "@server/domain/interface/repository/user-quiz-set-attempt.repository.interface";
import { UserQuizSetAttemptRepository } from "@server/infra/repository/user-quiz-set-attempt.repository";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function GetQuizSetAttemptById({
  c,
  id,
}: {
  c: Context;
  id: string;
}): Promise<UserQuizSetAttemptEntity> {
  const userQuizSetAttemptRepository: IUserQuizSetAttemptRepository =
    new UserQuizSetAttemptRepository();
  await userQuizSetAttemptRepository.initPrisma(c);
  const gotQuizSetAttempt =
    await userQuizSetAttemptRepository.getQuizSetAttemptById(id);
  if (!gotQuizSetAttempt) {
    throw new HTTPException(404, {
      message: "Quiz attempt not found",
    });
  }
  return gotQuizSetAttempt;
}
