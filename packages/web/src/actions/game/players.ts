"use server";

import { auth } from "@/auth";
import { Player } from "@/types/player";
import { Resource } from "sst/resource";

export const addPlayerToGame = async (gameId: string, player: Player) => {
	const session = await auth();

	if (!session) throw new Error("Could not find user");

	const response = await fetch(`${Resource.Hono.url}game/${gameId}/players`, {
		method: "POST",
		body: JSON.stringify({ player }),
	});

	if (!response.ok) throw new Error("Could not add player to game");
};
