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
		const tables = await import("./infra/tables");

		const api = new sst.aws.Function("Hono", {
			url: true,
			handler: "packages/api/src/index.handler",
			link: [tables.gameTable],
		});

		new sst.aws.Nextjs("PlaylistRoulette", {
			path: "./packages/web/",
			link: [api],
		});

		return {};
	},
});
