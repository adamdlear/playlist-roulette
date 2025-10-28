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
		const { httpApi, wsApi, createHonoFn } = await import("./infra/api");
		await import("./infra/tables");

		const web = new sst.aws.Nextjs("PlaylistRoulette", {
			path: "./packages/web/",
			link: [httpApi, wsApi],
			environment: {
				NEXT_PUBLIC_WS_URL: wsApi.url,
				NEXT_PUBLIC_API_URL: httpApi.url,
			},
		});

		const honoFn = createHonoFn(web.url);

		return {
			WebUrl: web.url,
		};
	},
});
