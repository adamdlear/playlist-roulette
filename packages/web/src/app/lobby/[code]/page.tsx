import { LobbyCard } from "@/components/lobby/lobby-card";
import { Player } from "@/types/player";

const LobbyPage = async ({ params }: { params: Promise<{ code: string }> }) => {
    const gameCode = (await params).code;

    const players: Player[] = []; // getPlayers()

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 flex justify-center items-center">
            <LobbyCard gameCode={gameCode} players={players} />
        </div>
    );
};

export default LobbyPage;
