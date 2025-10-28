"use client";

import { login } from "@/actions/auth";
import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/use-game";
import { createClient } from "@/lib/rpc";
import { useState } from "react";

export const CreatePartyButton = () => {
	const { status } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const { joinGame } = useGame();

	const handleClick = async () => {
		setIsLoading(true);

		if (status === "unauthenticated") {
			await login();
			return;
		}

		const isHost = true;

		const client = await createClient();
		const createGameResponse = await client.api.game.$post();
		if (!createGameResponse.ok) {
			console.error("Could not create game");
			return;
		}

		const { gameId } = await createGameResponse.json();

		joinGame(gameId, isHost);

		setIsLoading(false);
	};

	const buttonText = () => {
		if (status === "loading") {
			return "Loading...";
		}
		if (status === "unauthenticated") {
			return "Sign in to create a party";
		}
		return "Create a Party";
	};

	return (
		<Button
			type="button"
			onClick={handleClick}
			disabled={isLoading || status === "loading"}
			className="w-full"
		>
			{buttonText()}
		</Button>
	);
};
