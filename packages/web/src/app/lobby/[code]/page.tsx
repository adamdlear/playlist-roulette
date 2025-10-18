import { LobbyCard } from "@/components/lobby/lobby-card";

const LobbyPage = async ({ params }: { params: Promise<{ code: string }> }) => {
	const gameCode = (await params).code;

	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 flex justify-center items-center">
			<LobbyCard gameCode={gameCode} />
		</div>
	);
};

export default LobbyPage;
