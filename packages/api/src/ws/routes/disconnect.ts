import { removePlayerFromGame } from "@/services/games-service";
import { sendMessage } from "@/ws/client";
import {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyEventV2,
} from "aws-lambda";

export const handleDisconnect = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	// @ts-ignore
	const { connectionId } = event.requestContext;
	const players = await removePlayerFromGame(connectionId);

	for (const player of players) {
		await sendMessage(player.connectionId, {
			type: "player-disconnected",
			body: { players },
		});
	}

	return { statusCode: 200 };
};
