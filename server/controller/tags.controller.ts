import { OpenAPIHono } from "@hono/zod-openapi";
import { GetAllTagsUseCase } from "@server/usecase/tag/get-all-tags.usecase";

export const tagController = new OpenAPIHono();

// 使わない

tagController.get("/", async (c) => {
  const result = await GetAllTagsUseCase(c);
  return c.json(result);
});
