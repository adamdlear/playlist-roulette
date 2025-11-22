import { getPlayerConnection } from "@/services/connections-service";
import { getGame, startGame } from "@/services/games-service";
import { sendMessage } from "@/ws/client";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const handleStartGame = async (event: APIGatewayProxyEventV2) => {
	// @ts-ignore
	const { connectionId } = event.requestContext;

	const { Item: connection } = await getPlayerConnection(connectionId);
	if (!connection) {
		return { statusCode: 400, body: "Connection not found" };
	}

	const game = await getGame(connection.gameId);
	if (!game) {
		return { statusCode: 404, body: "Game not found" };
	}

	if (!game.players || game.players.length === 0) {
		return { statusCode: 400, body: "No players found in this game" };
	}

	const player = game.players?.find(
		(p: any) => p.connectionId === connectionId,
	);
	if (!player) {
		return { statusCode: 403, body: "You are not in this game" };
	}

	if (game.hostId !== player.id) {
		return { statusCode: 403, body: "Only the host can start the game" };
	}

	await startGame(connection.gameId);

	for (const p of game.players) {
		if (!p.connectionId) continue;
		await sendMessage(p.connectionId, {
			type: "game-started",
			body: { gameId: connection.gameId },
		});
	}

	return { statusCode: 200 };
};
