"use client";

import { createGameAction } from "@/actions/game/create-game";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/use-game";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CreatePartyButton = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { connect } = useGame();

	const handleClick = async () => {
		setIsLoading(true);

		if (!session) {
			await signIn("spotify", { callbackUrl: window.location.href });
			return;
		}

		try {
			const createGameResponse = await createGameAction();

			const getWsUrlResponse = await fetch("/api/ws");
			const { url } = await getWsUrlResponse.json();
			connect(url);

			router.push(`/lobby/${createGameResponse.gameId}`);
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
