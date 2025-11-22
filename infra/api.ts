import { connectionsTable, gameTable, authTable } from "./tables";

export const httpApi = new sst.aws.ApiGatewayV2("HttpApi", {
	cors: true,
});
export const wsApi = new sst.aws.ApiGatewayWebSocket("WebsocketApi");

export function createHonoFn(webAppUrl: string) {
	const honoFn = new sst.aws.Function("HonoHandler", {
		handler: "packages/api/src/index.handler",
		link: [gameTable, authTable, httpApi],
		environment: {
			SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID!,
			SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET!,
			WEB_APP_URL: webAppUrl,
		},
	});

	httpApi.route("ANY /{proxy+}", honoFn.arn);
	return honoFn;
}

export const wsFn = new sst.aws.Function("WebsocketHandler", {
	handler: "packages/api/src/ws/handler.handler",
	link: [httpApi, wsApi, gameTable, connectionsTable],
});

wsApi.route("$connect", wsFn.arn);
wsApi.route("$disconnect", wsFn.arn);
wsApi.route("$default", wsFn.arn);
