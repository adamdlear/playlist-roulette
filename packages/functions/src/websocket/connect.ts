import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyWebsocketEventV2,
} from "aws-lambda";
import { getDynamoClient } from "../dynamo/client";

export const handleConnect = async (
	event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const client = getDynamoClient();

	const command = new PutItemCommand({
		TableName: "ConnectionsTable",
		Item: {
			PK: { S: event.requestContext.connectionId },
		},
	});

	try {
		await client.send(command);
	} catch (error) {
		return { statusCode: 500, body: "Could not create player connection" };
	}

	return { statusCode: 200 };
};
