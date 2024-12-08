import { OpenAPIHono } from "@hono/zod-openapi";
import { UserScoreEntity } from "@server/domain/entity/user-score.entity";
import { UserEntity } from "@server/domain/entity/user.entity";
import { GetUserTopNScoreRankingUseCase } from "@server/usecase/user-score/get-user-top-n-score-ranking.usecase";

export const rankingController = new OpenAPIHono();

//
rankingController.get("/", async (c) => {
  const topNUsersAndScore = await GetUserTopNScoreRankingUseCase({
    topN: 30,
    c,
  });
  console.log("GetUserTopNScoreRankingUseCase:", topNUsersAndScore);
  const result = topNUsersAndScore.userEntity.map(
    (user: UserEntity, index: number) => ({
      userName: user.name,
      score: topNUsersAndScore.userScoreEntity[index].totalScore,
    }),
  );
  return c.json(result);
});
