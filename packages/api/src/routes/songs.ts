import { Context, Hono } from "hono";

const app = new Hono();

app.post("/random", async (c: Context) => {
	// get 4 random players
	// for each player get a random song from their playlist
	// choose a random song out of the 4
	// save this song to the results table with the game id and round number
	// get the info from spotify about this song and return it
});

export default app;
