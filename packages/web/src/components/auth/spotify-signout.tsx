import { logout } from "@/actions/auth";
import { Button } from "../ui/button";

export const SpotifySignout = () => {
	return (
		<form action={logout}>
			<Button>Signout of Spotify</Button>
		</form>
	);
};
