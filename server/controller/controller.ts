import { Hono } from "hono";

export const app = new Hono();
app.get("/", (c) => {
  console.log("Hello, World!");
  // ここにコントローラーを追加していく
  return c.json({ message: "Hello, World!" });
});
