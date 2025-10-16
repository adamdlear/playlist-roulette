import { Context, Next } from "hono";

export const websocketMiddleware = async (c: Context, next: Next) => {
	const event = c.env.event as any;
	if (event.requestContext && event.requestContext.connectionId) {
		const { routeKey, connectionId } = event.requestContext;
		switch (routeKey) {
			case "$connect":
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
