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
		const { httpApi, wsApi } = await import("./infra/api");
		await import("./infra/tables");

		new sst.aws.Nextjs("PlaylistRoulette", {
			path: "./packages/web/",
			link: [httpApi, wsApi],
		});

		return {};
	},
});
