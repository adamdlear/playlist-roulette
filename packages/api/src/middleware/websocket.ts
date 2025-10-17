import { Context, Next } from "hono";
import { authClient } from "../auth/client";
import { subjects } from "../auth/subjects";
import { addPlayerToGame } from "../services/games-service";

export const websocketMiddleware = async (c: Context, next: Next) => {
	const event = c.env.event as any;
	if (event.requestContext && event.requestContext.connectionId) {
		const { routeKey, connectionId } = event.requestContext;
		switch (routeKey) {
			case "$connect":
				const token = event.queryStringParameters?.token;

				if (!token) {
					return c.json({ error: "Unauthorized" }, 401);
				}

				const verified = await authClient.verify(subjects, token);

				if (verified.err) {
					return c.json({ error: "Invalid token" }, 401);
				}

				const gameId = event.queryStringParameters?.gameId;

				if (!gameId) {
					return c.json({ error: "Missing gameId" }, 400);
				}

				await addPlayerToGame(
					gameId,
					connectionId,
					verified.subject.properties.id,
				);

				console.log("WebSocket connected:", connectionId);
				break;
			case "$disconnect":
				console.log("WebSocket disconnected:", connectionId);
				break;
			case "$default":
				console.log("WebSocket message from:", connectionId);
				break;
			default:
				break;
		}
		return c.json({ statusCode: 200 });
	}
	await next();
};
