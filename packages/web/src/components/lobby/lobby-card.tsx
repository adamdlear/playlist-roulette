import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { type Player } from "@/types/player";
import { UpdateGameButton } from "./update-game-button";

interface LobbyCardProps {
    gameCode: string;
    players: Player[];
}

export const LobbyCard = ({ gameCode, players }: LobbyCardProps) => {
    return (
        <Card className="w-[600px]">
            <CardHeader className="text-center">
                <CardTitle className="text-4xl">{gameCode}</CardTitle>
                <CardDescription>Waiting for players...</CardDescription>
                <div className="pt-4">
                    <UpdateGameButton />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {players.length === 0 && (
                    <h2 className="text-zinc-600 text-center">
                        No players in this party yet
                    </h2>
                )}
                <div className="space-y-8">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage
                                        src={player.image ?? undefined}
                                    />
                                </Avatar>
                                <h3 className="text-xl">{player.name}</h3>
                            </div>
                            <div className="px-4 py-2 bg-zinc-200 text-zinc-600 rounded">
                                {player.isHost ? "Host" : "Player"}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};