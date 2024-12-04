import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => {
  console.log("Hello, World!");
  return c.json({ message: "Hello, World!" });
});
