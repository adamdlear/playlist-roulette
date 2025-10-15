import { connectionsTable, gameTable, authTable } from "./tables";

const wsFn = new sst.aws.Function("WebsocketFunction", {
	handler: "packages/functions/src/websocket/handler.handler",
	link: [connectionsTable, authTable],
	environment: {
		AUTH_SECRET: process.env.AUTH_SECRET,
	},
});

export const api = new sst.aws.Function("Hono", {
	url: true,
	handler: "packages/api/src/index.handler",
	link: [gameTable, ws],
});

export const ws = new sst.aws.ApiGatewayWebSocket("WebsocketApi");
ws.route("$connect", wsFn.arn);
ws.route("$disconnect", wsFn.arn);
