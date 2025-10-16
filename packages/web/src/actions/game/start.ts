"use server";

import { Resource } from "sst/resource";
import { redirect } from "next/navigation";

export const startGameAction = async (gameCode: string) => {
	const response = await fetch(
		`${Resource.HttpApi.url}/game/start/${gameCode}`,
		{
			method: "POST",
		},
	);

	if (!response.ok) throw new Error("failed to start the game");

	redirect(`/game/${gameCode}`);
};
