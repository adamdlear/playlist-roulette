import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SpotifySignin } from "../spotify/spotify-signin";

export const ProviderSigninDialog = ({ ...props }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button {...props}>Join Game</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Signin</DialogTitle>
					<DialogDescription>
						Before joining the game, you need to signin to your favorite music
						app
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-center">
					<div className="w-full px-6">
						<SpotifySignin className="w-full" />
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
