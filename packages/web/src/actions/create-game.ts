"use server";

import { auth } from "@/auth";
import { Resource } from "sst";

export const createGameAction = async () => {
	const session = await auth();

	if (!session) {
		throw new Error("could not find user");
	}

	const hostId = session.user.profileId;

	const response = await fetch(`${Resource.Hono.url}game`, {
		method: "POST",
		body: JSON.stringify({ hostId }),
	});

	if (!response.ok) throw new Error("Failed to create the game");

	const { gameId } = await response.json();

	return {
		gameId: gameId,
	};
};
