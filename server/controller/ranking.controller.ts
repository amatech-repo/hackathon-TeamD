import { OpenAPIHono } from "@hono/zod-openapi";
import { GetUserTopNScoreRankingUseCase } from "@server/usecase/user-score/get-user-top-n-score-ranking.usecase";

export const rankingController = new OpenAPIHono();

rankingController.get("/", async (c) => {
  const topN = c.req.query("topN") ?? "1";
  const num = parseInt(topN) || 1;
  const topNUsersAndScore = await GetUserTopNScoreRankingUseCase({
    topN: num,
    c,
  });
  console.log("GetUserTopNScoreRankingUseCase:", topNUsersAndScore);
  return c.json(topNUsersAndScore);
});
