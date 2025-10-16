import { CreatePartyButton } from "@/components/home/create-party-button";
import { GameCodeForm } from "@/components/home/game-code-form";
import { AuthArea } from "@/components/home/auth-area";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center">
							Playlist Roulette
						</CardTitle>
						<CardDescription className="text-center">
							Some tagline here
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						<div className="flex flex-col gap-1">
							<h2 className="text-lg font-bold text-center">Join a Party</h2>
							<GameCodeForm />
						</div>
						<CardDescription className="text-md text-center">
							or
						</CardDescription>
						<div>
							<CreatePartyButton />
						</div>
					</CardContent>
				</Card>
				<AuthArea />
			</div>
		</div>
	);
};

export default HomePage;
