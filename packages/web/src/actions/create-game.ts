"use server";

import { auth } from "@/auth";
import { Resource } from "sst";

interface CreateGameActionResponse {
    gameId: string;
}

export const createGameAction = async (): Promise<CreateGameActionResponse> => {
    const session = await auth();

    if (!session) {
        throw new Error("could not find user");
    }

    const hostId = session.user.profileId;

    const putGameResponse = await addGameToTable(hostId);
    if (!putGameResponse) {
        throw new Error("could put game in games table");
    }

    return {
        gameId: putGameResponse.gameId,
    };
};

const addGameToTable = async (hostId: string) => {
    const response = await fetch(`${Resource.RestApi.url}/game`, {
        method: "PUT",
        body: JSON.stringify({ hostId }),
    });

    return await response.json();
};
