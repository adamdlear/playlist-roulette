import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { getDynamoClient } from "../dynamo/client";
import {
	APIGatewayProxyWebsocketEventV2,
	APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

export const handleDisconnect = async (
	event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const client = getDynamoClient();

	const command = new DeleteItemCommand({
		TableName: "ConnectionsTable",
		Key: {
			PK: { S: event.requestContext.connectionId },
		},
	});

	try {
		await client.send(command);
	} catch (error) {
		return { statusCode: 500, body: newFunction() };
	}

	return { statusCode: 200 };

	function newFunction(): string | undefined {
		return "Could not delete player connection";
	}
};
