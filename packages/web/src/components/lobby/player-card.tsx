import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/subjects";

interface PlayerCardProps {
	player: User;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
	return (
		<Card className="p-3 bg-secondary flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<Avatar>
					{/* <AvatarImage src={player.image} /> */}
					<AvatarImage src={undefined} />
					<AvatarFallback className="bg-secondary brightness-90">
						{player.name[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<h3 className="text-xl">{player.name}</h3>
			</div>
			{/* <div className="px-4 py-2 bg-zinc-200 text-zinc-600 rounded"> */}
			{/* 	{player.isHost ? "Host" : "Player"} */}
			{/* </div> */}
		</Card>
	);
};
