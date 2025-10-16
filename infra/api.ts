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

wsApi.route("$connect", honoFn.arn);
wsApi.route("$disconnect", honoFn.arn);
wsApi.route("$default", honoFn.arn);
