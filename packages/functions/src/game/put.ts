import { Resource } from "sst";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
    type APIGatewayProxyEventV2,
    type APIGatewayProxyResultV2,
} from "aws-lambda";
import { generateGameId } from "../../utils/game";

const dynamodb = new DynamoDBClient();

export const handler = async (
    event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
    console.log("connecting to websocket");

    const { hostId } = JSON.parse(event.body || "{}");
    if (!hostId) {
        return {
            statusCode: 400,
            body: "hostId is required",
        };
    }

    const gameId = generateGameId();

    // TODO: if gameId exists, generate new one

    const putGameIdCommand = new PutItemCommand({
        TableName: Resource.Games.name,
        Item: {
            gameId: { S: gameId },
            hostId: { S: hostId },
            startTime: { S: Date.now().toString() },
        },
    });

    try {
        const response = dynamodb.send(putGameIdCommand);
        if (!response) throw new Error("Could not put gameId in gamesTable");
        return {
            statusCode: 200,
            body: JSON.stringify({ gameId }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: (error as Error).message,
        };
    }
};
