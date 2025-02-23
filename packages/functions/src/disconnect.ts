import { Resource } from "sst";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import {
    Handler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from "aws-lambda";

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

    const command = new DeleteItemCommand({
        TableName: Resource.Connections.name,
        Key: {
            connectionId: { S: connectionId },
        },
    });

    try {
        const response = dynamodb.send(command);
        return {
            statusCode: 200,
            body: `Successfully deleted connectionId ${connectionId}`,
        };
    } catch (error) {
        console.error("Could not delete connection");
        console.error(error);
        return {
            statusCode: 500,
            body: error as string,
        };
    }
};
