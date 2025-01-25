"use server";

import { Resource } from "sst";
import { auth, signIn } from "@/auth";
import { generatePartyId } from "@/lib/party";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

interface CreateGameActionResponse {
    gameId: string;
}

export const createGameAction = async (): Promise<CreateGameActionResponse> => {
    let session = await auth();
    if (!session) {
        await signIn("spotify");
        session = await auth();
    }

    if (!session) {
        throw new Error("could not find user");
    }

    const hostId = session.user.profileId;
    const gameId = generatePartyId();

    const putGameResponse = await addGameToTable(gameId, hostId);
    if (!putGameResponse) {
        throw new Error("could put game in games table");
    }

    return {
        gameId,
    };
};

const addGameToTable = async (gameId: string, hostId: string) => {
    const dynamodb = new DynamoDBClient();

    const command = new PutItemCommand({
        TableName: Resource.GameTable.name,
        Item: {
            gameId: { S: gameId },
            hostId: { S: hostId },
            timestamp: { S: Date.now().toString() },
        },
    });

    return await dynamodb.send(command);
};
