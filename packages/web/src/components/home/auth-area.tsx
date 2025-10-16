"use client";

import { useSession } from "@/components/providers/session-provider";
import { SpotifySignout } from "@/components/auth/spotify-signout";

export const AuthArea = () => {
	const { status } = useSession();

	if (status === "authenticated") {
		return (
			<div className="flex justify-center mt-4">
				<SpotifySignout />
			</div>
		);
	}

	return null;
};
