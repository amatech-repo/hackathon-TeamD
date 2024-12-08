import { IUserScoreRepository } from "@server/domain/interface/repository/user-score.repository.interface";
import { UserScoreRepository } from "@server/infra/repository/user-score.repository";
import { Context } from "hono";

export async function DeleteUserScoreByUserIdUseCase({
  userId,
  c,
}: {
  userId: string;
  c: Context;
}): Promise<void> {
  const userScoreRepository: IUserScoreRepository = new UserScoreRepository();
  await userScoreRepository.initPrisma(c);

  await userScoreRepository.deleteUserScoreByUserId(userId);
}
