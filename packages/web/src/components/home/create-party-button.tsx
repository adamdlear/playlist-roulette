"use client";

import { createGameAction } from "@/actions/create-game";
import { Button } from "@/components/ui/button";
// import { useWebSocket } from "@/hooks/use-websocket";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CreatePartyButton = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	// const { connect } = useWebSocket();

	const handleClick = async () => {
		setIsLoading(true);

		if (!session) {
			await signIn("spotify", { callbackUrl: window.location.href });
			return;
		}

		try {
			const createGameResponse = await createGameAction();
			router.push(`/lobby/${createGameResponse.gameId}`);
			// connect();
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
