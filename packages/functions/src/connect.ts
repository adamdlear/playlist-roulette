import { Resource } from "sst";
import {
    APIGatewayProxyEvent,
    Handler,
    APIGatewayProxyResult,
} from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamodb = new DynamoDBClient();

export const handler: Handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    const connectionId = event.requestContext.connectionId;
    if (!connectionId) {
        return {
            statusCode: 500,
            body: "No connectionId in the request",
        };
    }

    const command = new PutItemCommand({
        TableName: Resource.ConnectionsTable.name,
        Item: {
            connectionId: { S: connectionId },
            timestamp: { N: Date.now().toString() },
        },
    });

    try {
        const response = await dynamodb.send(command);
        if (!response)
            throw new Error(`Could not put connectionId ${connectionId}`);
        return {
            statusCode: 200,
            body: `Successfully put connectionId ${connectionId}`,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: error as string,
        };
    }
};
