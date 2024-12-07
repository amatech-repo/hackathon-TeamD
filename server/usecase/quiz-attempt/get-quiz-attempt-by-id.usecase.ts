import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";
import { IUserQuizAttemptRepository } from "@server/domain/interface/repository/user-quiz-attempt.repository.interface";
import { UserQuizAttemptRepository } from "@server/infra/repository/user-quiz-attempt.repository";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function GetQuizAttemptById({
  c,
  id,
}: {
  c: Context;
  id: string;
}): Promise<UserQuizAttemptEntity> {
  const userQuizAttemptRepository: IUserQuizAttemptRepository =
    new UserQuizAttemptRepository();
  await userQuizAttemptRepository.initPrisma(c);
  const gotQuizAttempt = await userQuizAttemptRepository.getQuizAttemptById(id);
  if (!gotQuizAttempt) {
    throw new HTTPException(404, {
      message: "Quiz attempt not found",
    });
  }
  return gotQuizAttempt;
}
