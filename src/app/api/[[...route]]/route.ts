import { handle } from "hono/vercel";
import serverApp from "@server/index";

const runtime: "nodejs" | "edge" = "nodejs";

export type AppType = typeof serverApp;

export { runtime };

export const GET = handle(serverApp);
export const POST = handle(serverApp);
export const PUT = handle(serverApp);
export const DELETE = handle(serverApp);
export const PATCH = handle(serverApp);
export const HEAD = handle(serverApp);
export const OPTIONS = handle(serverApp);
