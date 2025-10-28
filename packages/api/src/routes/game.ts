import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { Env } from "..";
import { createGame, startGame } from "../services/games-service";

const app = new Hono<Env>()
	.post("/", async (c) => {
		const user = c.get("user");
		const gameId = await createGame(user.id);
		return c.json({ gameId });
	})
	.post(
		"/start/:gameId",
		zValidator(
			"param",
			z.object({
				gameId: z.string(),
			}),
		),
		async (c) => {
			const { gameId } = c.req.valid("param");
			const response = await startGame(gameId);
			return c.json(response);
		},
	);

export default app;
