import { login } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const SpotifySignin = ({ ...props }) => {
	return (
		<form action={login}>
			<Button
				type="submit"
				variant="secondary"
				className={cn(props.className, "bg-green-500 text-zinc-900 font-bold")}
			>
				Signin with Spotify
			</Button>
		</form>
	);
};
