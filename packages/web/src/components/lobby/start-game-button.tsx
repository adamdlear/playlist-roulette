"use client";

import { startGameAction } from "@/actions/game/start";
import { useState } from "react";
import { Button } from "../ui/button";

interface StartGameButtonProps {
	gameCode: string;
}

export const StartGameButton = ({ gameCode }: StartGameButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = () => {
		setIsLoading(true);

		startGameAction(gameCode);

		setIsLoading(false);
	};

	return (
		<Button onClick={handleClick} disabled={isLoading}>
			Start Game
		</Button>
	);
};
