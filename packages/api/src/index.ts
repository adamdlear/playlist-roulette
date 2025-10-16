import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { authMiddleware } from "./middleware/auth";
import { websocketMiddleware } from "./middleware/websocket";
import { authServer } from "./auth/issuer";
import game from "./routes/game";

const app = new Hono();

app.use("*", websocketMiddleware);
app.use("/api/*", authMiddleware);

app.get("/health", (c) => {
	return c.json({ status: "ok" });
});

app.route("/game", game);
app.route("/", authServer);

export const handler = handle(app);

export default app;
