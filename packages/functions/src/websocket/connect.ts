import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import type {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";
import { Resource } from "sst";

const dynamodb = new DynamoDBClient();

export const handler: Handler = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	const connectionId = event.requestContext.connectionId;
	const gameId = event.queryStringParameters?.gameId;

	if (!connectionId) {
		return {
			statusCode: 500,
			body: "No connectionId in the request",
		};
	}

	if (!gameId) {
		return {
			statusCode: 400,
			body: "Game ID is required",
		};
	}

	const command = new PutItemCommand({
		TableName: Resource.Connections.name,

		Item: {
			connectionId: { S: connectionId },
			gameId: { S: gameId },
			timestamp: { N: Date.now().toString() },
		},
	});

	try {
		await dynamodb.send(command);
		return {
			statusCode: 200,
			body: `Successfully put connectionId ${connectionId}`,
		};
	} catch (error) {
		console.error("Could not put connection");
		console.error(error);
		return {
			statusCode: 500,
			body: error as string,
		};
	}
};
