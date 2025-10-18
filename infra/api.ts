import { connectionsTable, gameTable, authTable } from "./tables";

export const httpApi = new sst.aws.ApiGatewayV2("HttpApi");
export const wsApi = new sst.aws.ApiGatewayWebSocket("WebsocketApi");

export const honoFn = new sst.aws.Function("HonoHandler", {
	handler: "packages/api/src/index.handler",
	link: [gameTable, connectionsTable, authTable, httpApi],
	environment: {
		SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
	},
});

httpApi.route("ANY /{proxy+}", honoFn.arn);

export const wsFn = new sst.aws.Function("WebsocketHandler", {
	handler: "packages/api/src/ws/handler.handler",
	link: [httpApi, wsApi, gameTable],
});

wsApi.route("$connect", wsFn.arn);
wsApi.route("$disconnect", wsFn.arn);
wsApi.route("$default", wsFn.arn);
