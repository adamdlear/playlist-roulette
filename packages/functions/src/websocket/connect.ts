import { verify } from "jsonwebtoken";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { Resource } from "sst/resource";
import { getDynamoClient } from "../dynamo/client";
import { WebSocketConnectEventV2 } from "./types";

export const handleConnect = async (
	event: WebSocketConnectEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const connectionId = event.requestContext.connectionId;
	const params = event.queryStringParameters;

	const token = params?.token;
	const gameId = params?.gameId;
	const isHost = params?.isHost;

	if (!token) {
		return { statusCode: 401, body: "Unauthorized" };
	}

	if (!gameId) {
		return {
			statusCode: 400,
			body: "Bad Request: statusCode missing from request",
		};
	}

	console.debug("Received token: ", token);
	let decoded;
	try {
		decoded = verify(decodeURIComponent(token), process.env.AUTH_SECRET!);
	} catch (error) {
		console.error(error);
		throw error;
	}

	const dynamo = getDynamoClient();

	try {
		await dynamo.send(
			new UpdateItemCommand({
				TableName: Resource.Games.name,
				Key: marshall({
					PK: `GAME#${gameId}`,
				}),
				UpdateExpression:
					"SET players = list_append(if_not_exists(players, :empty_list), :new_player)",
				ExpressionAttributeValues: marshall({
					":new_player": [
						{
							id: decoded.playerId,
							email: decoded.playerEmail,
							name: decoded.playerName,
							image: decoded.playerImage,
							isHost,
							connectionId,
						},
					],
					":empty_list": [],
				}),
			}),
		);
	} catch (error) {
		console.error(error);
		return { statusCode: 500, body: "Could not create player connection" };
	}

	return { statusCode: 200 };
};
