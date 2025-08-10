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

		new sst.aws.Nextjs("PlaylistRoulette", {
			path: "./packages/web/",
			link: [api, ws],
		});

		return {};
	},
});
