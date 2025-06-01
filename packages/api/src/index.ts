import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { game } from "./routes/game";

const app = new Hono();

app.route("/game", game);

export const handler = handle(app);

export default app;
