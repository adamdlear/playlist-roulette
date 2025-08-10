import { connectionsTable, gameTable } from "./tables";

export const ws = new sst.aws.ApiGatewayWebSocket("WebsocketApi");
ws.route("$connect", {
	handler: "packages/functions/src/websocket/handler.handler",
	link: [connectionsTable],
});
ws.route("$disconnect", {
	handler: "packages/functions/src/websocket/handler.handler",
	link: [connectionsTable],
});

export const api = new sst.aws.Function("Hono", {
	url: true,
	handler: "packages/api/src/index.handler",
	link: [gameTable, ws],
});
