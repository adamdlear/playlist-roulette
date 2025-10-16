"use server";

import { auth } from "@/actions/auth";
import { Resource } from "sst/resource";

export const createGameAction = async () => {
	const subject = await auth();

	if (!subject) {
		throw new Error("could not find user");
	}

	const hostId = subject.properties.id;

	const response = await fetch(`${Resource.HttpApi.url}/game`, {
		method: "POST",
		body: JSON.stringify({ hostId }),
	});

	if (!response.ok) throw new Error("Failed to create the game");

	const { gameId } = await response.json();

	return {
		gameId: gameId,
	};
};
