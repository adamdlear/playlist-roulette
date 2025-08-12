"use client";

import { createGameAction } from "@/actions/game/create";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/use-game";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CreatePartyButton = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { joinGame } = useGame();

	const handleClick = async () => {
		setIsLoading(true);

		if (!session) {
			await signIn("spotify", { callbackUrl: window.location.href });
			return;
		}

		try {
			const { gameId } = await createGameAction();
			joinGame(gameId, { ...session.user, isHost: true });
			router.push(`/lobby/${gameId}`);
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	};

	return (
		<Button onClick={handleClick} disabled={isLoading} className="w-full">
			{!session ? "Sign in to create a party" : "Create a Party"}
		</Button>
	);
};
