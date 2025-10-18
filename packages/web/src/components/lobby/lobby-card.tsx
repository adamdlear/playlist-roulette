"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

interface LobbyCardProps {
	gameCode: string;
}

export const LobbyCard = ({ gameCode }: LobbyCardProps) => {
	const { players } = useGame();

	return (
		<Card className="w-[600px]">
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
				<div className="space-y-8">
					{players.map((player, index) => (
						<div key={index} className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src={player.image} />
								</Avatar>
								<h3 className="text-xl">{player.name}</h3>
							</div>
							{/* <div className="px-4 py-2 bg-zinc-200 text-zinc-600 rounded"> */}
							{/* 	{player.isHost ? "Host" : "Player"} */}
							{/* </div> */}
						</div>
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
