import { issuer } from "@openauthjs/openauth";
import { createClient } from "@openauthjs/openauth/client";
import { SpotifyProvider } from "@openauthjs/openauth/provider/spotify";
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst/resource";
import game from "./routes/game";
import ws from "./routes/ws";
import { subjects } from "./subjects";

const app = new Hono();

const authServer = issuer({
	subjects,
	storage: DynamoStorage({
		table: Resource.Auth.name,
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
		if (value.provider === "spotify") {
			// Fetch user info from Spotify
			const response = await fetch("https://api.spotify.com/v1/me", {
				headers: {
					Authorization: `Bearer ${value.tokenset.access}`,
				},
			});

			const spotifyUser = await response.json();

			// Save user to database
			await saveUser({
				id: spotifyUser.id,
				email: spotifyUser.email,
				spotifyId: spotifyUser.id,
				spotifyAccessToken: value.tokenset.access,
				spotifyRefreshToken: value.tokenset.refresh!,
				spotifyTokenExpiry: Date.now() + value.tokenset.expiry! * 1000,
				displayName: spotifyUser.display_name,
				imageUrl: spotifyUser.images?.[0]?.url,
			});

			return ctx.subject("user", {
				id: spotifyUser.id,
				email: spotifyUser.email,
				spotifyId: spotifyUser.id,
			});
		}

		throw new Error("Invalid provider");
	},
});

app.route("/auth", authServer);

const authClient = createClient({
	clientID: "hono-api",
	issuer: Resource.Hono.url + "/auth",
});

const authMiddleware = async (c: any, next: any) => {
	const authHeader = c.req.header("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const token = authHeader.substring(7);
	const verified = await authClient.verify(subjects, token);

	if (verified.err) {
		return c.json({ error: "Invalid token" }, 401);
	}

	c.set("user", verified.subject);
	await next();
};

app.get("/health", (c) => {
	return c.json({ status: "ok" });
});

app.use("/api/*", authMiddleware);

app.route("/game", game);
app.route("/ws", ws);

export const handler = handle(app);

export default app;
