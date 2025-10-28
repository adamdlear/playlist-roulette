import { getPlayerConnection } from "@/services/connections-service";
import { getGame } from "@/services/games-service";
import { sendMessage } from "@/ws/client";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const handleGetPlayers = async (event: APIGatewayProxyEventV2) => {
	// @ts-ignore
	const { connectionId } = event.requestContext;

	const { Item: connection } = await getPlayerConnection(connectionId);
	if (!connection) {
		return { statusCode: 400 };
	}

	const game = await getGame(connection.gameId);
	if (!game) {
		return { statusCode: 400 };
	}

	await sendMessage(connectionId, {
		type: "player-joined",
		body: { players: game.players },
	});

	return { statusCode: 200 };
};
