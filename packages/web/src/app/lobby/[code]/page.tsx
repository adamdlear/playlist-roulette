import { auth } from "@/auth";
import { SpotifySignin } from "@/components/spotify/spotify-signin";

const LobbyPage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const gameCode = (await params).code;

  const session = await auth();

  return (
    <div className="flex flex-col items-center">
      <h1>{gameCode}</h1>
      {!session && <SpotifySignin />}
    </div>
  );
};

export default LobbyPage;
