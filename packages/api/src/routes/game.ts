import { Context, Hono } from "hono";
import { createGame, startGame } from "../services/games-service";

const app = new Hono();

app.post("/", async (c: Context) => {
	const body = await c.req.json();
	const { hostId } = body;
	const gameId = await createGame(hostId);
	return c.json({ gameId });
});

app.post("/start/:gameId", async (c: Context) => {
	const gameId = c.req.param("gameId");
	const response = await startGame(gameId);
	return c.json(response);
});

export default app;
