/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "playlist-roulette",
			removal: input?.stage === "production" ? "retain" : "remove",
			protect: ["production"].includes(input?.stage),
			home: "aws",
		};
	},
	async run() {
		const { api, ws } = await import("./infra/api");
		const { authTable } = await import("./infra/tables");

		new sst.aws.Nextjs("PlaylistRoulette", {
			path: "./packages/web/",
			link: [api, ws, authTable],
			environment: {
				AUTH_SECRET: process.env.AUTH_SECRET,
				SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
				SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
				AUTH_TABLE_NAME: authTable.name,
			},
		});

		return {};
	},
});
