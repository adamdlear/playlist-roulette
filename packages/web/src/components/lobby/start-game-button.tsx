"use client";

import { useGame } from "@/hooks/use-game";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

interface StartGameButtonProps {
	gameCode: string;
}

export const StartGameButton = ({ gameCode }: StartGameButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { startGame } = useGame();
	const router = useRouter();

	const handleClick = async () => {
		setIsLoading(true);
		await startGame(gameCode);
		router.push(`/game/${gameCode}`);
	};

	return (
		<Button onClick={handleClick} disabled={isLoading}>
			Start Game
		</Button>
	);
};
