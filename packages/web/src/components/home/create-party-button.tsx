"use client";

import { login } from "@/actions/auth";
import { createGameAction } from "@/actions/game/create";
import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/use-game";
import { useState } from "react";

export const CreatePartyButton = () => {
	const { session, status } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const { joinGame } = useGame();

	const handleClick = async () => {
		setIsLoading(true);

		if (status === "loading") {
			return;
		}

		if (status === "unauthenticated" || !session) {
			await login();
			return;
		}

		try {
			const { gameId } = await createGameAction();
			const isHost = true;
			joinGame(gameId, isHost);
		} catch (error) {
			console.error(error);
		}

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
