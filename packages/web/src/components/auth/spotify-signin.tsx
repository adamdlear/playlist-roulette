import { signIn } from "@/auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const SpotifySignin = ({ ...props }) => {
	return (
		<form
			action={async (formData) => {
				"use server";
				await signIn("spotify", formData);
			}}
		>
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
