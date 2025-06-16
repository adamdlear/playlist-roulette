import {
	Card,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	CardHeader,
} from "../ui/card";

interface GameCardProps {
	gameCode: string;
}

export const GameCard = ({ gameCode }: GameCardProps) => {
	return (
		<Card className="w-[600px]">
			<CardHeader className="text-center">
				<CardTitle className="text-3xl">Guess Who</CardTitle>
				<CardDescription>
					Select which player(s) have this song saved in a playlist
				</CardDescription>
			</CardHeader>
		</Card>
	);
};
