"use server";

import { auth } from "@/actions/auth";
import { Player } from "@/types/player";
import { Resource } from "sst";

export const addPlayerToGame = async (gameId: string, player: Player) => {
	const subject = await auth();

	if (!subject) throw new Error("Could not find user");

	const response = await fetch(
		`${Resource.HttpApi.url}/game/${gameId}/players`,
		{
			method: "POST",
			body: JSON.stringify({ player }),
		},
	);

	if (!response.ok) throw new Error("Could not add player to game");
};
