import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { Resource } from "sst/resource";
import { getDynamoClient } from "../dynamo/client";
import { WebSocketDisconnectEventV2 } from "./types";

export const handleDisconnect = async (
	event: WebSocketDisconnectEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const connectionId = event.requestContext.connectionId;
	const params = event.queryStringParameters;

	const gameId = params?.gameId;

	const dynamo = getDynamoClient();

	try {
		const gameItems = await dynamo.send(
			new GetItemCommand({
				TableName: Resource.Games.name,
				Key: marshall({
					PK: `GAME#${gameId}`,
				}),
			}),
		);

		if (!gameItems.Item) {
			return { statusCode: 404, body: "Game not found" };
		}

		const game = unmarshall(gameItems.Item);
		const updatedPlayers = (game.players || []).filter(
			(player: any) => player.connectionId !== connectionId,
		);

		await dynamo.send(
			new UpdateItemCommand({
				TableName: Resource.Games.name,
				Key: marshall({ PK: `GAME#${gameId}` }),
				UpdateExpression: "SET players = :updatedPlayers",
				ExpressionAttributeValues: marshall({
					":updatedPlayers": updatedPlayers,
				}),
			}),
		);

		return { statusCode: 200 };
	} catch (error) {
		console.error(error);
		return { statusCode: 500, body: "Could not remove player connection" };
	}
};
