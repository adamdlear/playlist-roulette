import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import game from "./routes/game";
import ws from "./routes/ws";

const app = new Hono();

app.route("/game", game);
app.route("/ws", ws);

export const handler = handle(app);

export default app;
