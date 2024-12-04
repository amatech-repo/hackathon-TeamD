import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { app } from "@server/controller/controller";

const serverApp = new OpenAPIHono().basePath("/api");
serverApp.route("/", app);
if (process.env.NODE_ENV !== "production") {
  serverApp.doc("/doc", {
    info: {
      title: "An API",
      version: "v1",
    },
    openapi: "3.1.0",
  });

  // Swagger UIエンドポイント
  serverApp.get("/ui", swaggerUI({ url: "/api/doc" }));
}
serverApp.basePath("/api");

export default serverApp;
