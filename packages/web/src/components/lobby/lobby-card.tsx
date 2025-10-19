"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGame } from "@/hooks/use-game";
import { StartGameButton } from "./start-game-button";
import { PlayerCard } from "./player-card";

interface LobbyCardProps {
	gameCode: string;
}

export const LobbyCard = ({ gameCode }: LobbyCardProps) => {
	const { players } = useGame();

	return (
		<Card className="min-w-[400px]">
			<CardHeader className="text-center">
				<CardTitle className="text-4xl">{gameCode}</CardTitle>
				<CardDescription>Waiting for players...</CardDescription>
			</CardHeader>
			<CardContent>
				{players.length === 0 && (
					<h2 className="text-zinc-600 text-center">
						No players in this party yet
					</h2>
				)}
				<div className="space-y-4">
					{players.map((player, index) => (
						<PlayerCard key={`${player.id}-${index}`} player={player} />
					))}
				</div>
			</CardContent>
			<CardFooter>
				<div className="w-full flex justify-center">
					<StartGameButton gameCode={gameCode} />
				</div>
			</CardFooter>
		</Card>
	);
};
