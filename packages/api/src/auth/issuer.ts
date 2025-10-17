import { issuer } from "@openauthjs/openauth";
import { SpotifyProvider } from "@openauthjs/openauth/provider/spotify";
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo";
import { Resource } from "sst/resource";
import { subjects } from "./subjects";

export const authServer = issuer({
	subjects,
	storage: DynamoStorage({
		table: Resource.AuthStorage.name,
	}),
	allow: async () => true, // Remove after setting up custom domain
	providers: {
		spotify: SpotifyProvider({
			clientID: process.env.SPOTIFY_CLIENT_ID!,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
			scopes: [
				"user-read-email",
				"user-read-private",
				"playlist-read-private",
				"playlist-read-collaborative",
			],
		}),
	},
	success: async (ctx, value) => {
		console.log("ctx", ctx);
		console.log("value", value);

		if (value.provider === "spotify") {
			// Fetch user info from Spotify
			const response = await fetch("https://api.spotify.com/v1/me", {
				headers: {
					Authorization: `Bearer ${value.tokenset.access}`,
				},
			});

			const spotifyUser = await response.json();

			return ctx.subject("user", {
				id: spotifyUser.id,
				email: spotifyUser.email,
				spotifyId: spotifyUser.id,
			});
		}

		throw new Error("Invalid provider");
	},
});
