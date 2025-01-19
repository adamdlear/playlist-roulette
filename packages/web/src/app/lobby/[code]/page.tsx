import { auth } from "@/auth";
import { PlayerCard } from "@/components/lobby/player-card";
import { SpotifySignin } from "@/components/spotify/spotify-signin";
import { Player } from "@/types/player";

const LobbyPage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const gameCode = (await params).code;

  const session = await auth();

  if (!session || !session.user) {
    return <SpotifySignin />;
  }

  const player: Player = session.user;
  player.isHost = true;
  const players: Player[] = [player];

  return (
    <div className="flex flex-col items-center">
      <h1>{gameCode}</h1>
      {players.map((player, index) => (
        <PlayerCard player={player} key={index} />
      ))}
    </div>
  );
};

export default LobbyPage;
