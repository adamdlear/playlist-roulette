import {
	APIGatewayProxyEventV2,
	APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
import { handleConnect } from "@/ws/routes/connect";
import { handleDisconnect } from "@/ws/routes/disconnect";
import { handleGetPlayers } from "@/ws/routes/get-players";
import { handleStartGame } from "./routes/start-game";

export const handler = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const { routeKey } = event.requestContext;

	switch (routeKey) {
		case "$connect":
			return handleConnect(event);

		case "$disconnect":
			return handleDisconnect(event);

		case "$default":
			const body = JSON.parse(event.body ?? "{}");
			if (body.action === "get-players") {
				return handleGetPlayers(event);
			}
			if (body.action === "start-game") {
				return handleStartGame(event);
			}
			break;
	}

	return { statusCode: 200 };
};
