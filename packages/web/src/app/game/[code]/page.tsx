import { GameCard } from "@/components/game/game-card";

const GamePage = async ({ params }: { params: Promise<{ code: string }> }) => {
	const gameCode = (await params).code;

	return (
		<div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 flex items-center justify-center">
			<GameCard gameCode={gameCode} />
		</div>
	);
};

export default GamePage;
