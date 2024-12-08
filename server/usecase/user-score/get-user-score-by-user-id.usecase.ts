import { UserScoreEntity } from "@server/domain/entity/user-score.entity";
import { IUserScoreRepository } from "@server/domain/interface/repository/user-score.repository.interface";
import { UserScoreRepository } from "@server/infra/repository/user-score.repository";
import { Context } from "hono";

export async function GetUserScoreByUserIdUseCase({
  userId,
  c,
}: {
  userId: string;
  c: Context;
}): Promise<UserScoreEntity | null> {
  const userScoreRepository: IUserScoreRepository = new UserScoreRepository();
  await userScoreRepository.initPrisma(c);

  const userScore = await userScoreRepository.getScoreByUserId(userId);
  return userScore;
}
