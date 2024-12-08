import { OpenAPIHono } from "@hono/zod-openapi";
import { GetUserTopNScoreRankingUseCase } from "@server/usecase/user-score/get-user-top-n-score-ranking.usecase";

export const rankingController = new OpenAPIHono();

rankingController.get("/", async (c) => {
  const topNUsersAndScore = await GetUserTopNScoreRankingUseCase({
    topN: 30,
    c,
  });
  console.log("GetUserTopNScoreRankingUseCase:", topNUsersAndScore);
  return c.json(topNUsersAndScore);
});
