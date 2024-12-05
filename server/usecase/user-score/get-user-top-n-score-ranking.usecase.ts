import { UserScoreEntity } from "@server/domain/entity/user-score.entity";
import { UserEntity } from "@server/domain/entity/user.entity";
import { IUserScoreRepository } from "@server/domain/interface/repository/user-score.repository.interface";
import { UserScoreRepository } from "@server/infra/repository/user-score.repository";
import { Context } from "hono";

export async function GetUserTopNScoreRankingUseCase({
  topN,
  c,
}: {
  topN: number;
  c: Context;
}): Promise<{ userScoreEntity: UserScoreEntity[]; userEntity: UserEntity[] }> {
  const userScoreRepository: IUserScoreRepository = new UserScoreRepository();
  await userScoreRepository.initPrisma(c);

  const ranking = await userScoreRepository.getTopNUsersScore(topN);
  const rankingUserDetails = await userScoreRepository.getTopNUsers(topN);

  return { userScoreEntity: ranking, userEntity: rankingUserDetails };
}
