import { connectionsTable, gameTable } from "./tables";

const wsApi = new sst.aws.ApiGatewayWebSocket("WebsocketApi");
wsApi.route("$connect", {
	handler: "packages/functions/src/websocket/handler.handler",
	link: [connectionsTable],
});
wsApi.route("$disconnect", {
	handler: "packages/functions/src/websocket/handler.handler",
	link: [connectionsTable],
});

export const api = new sst.aws.Function("Hono", {
	url: true,
	handler: "packages/api/src/index.handler",
	link: [gameTable, wsApi],
});
