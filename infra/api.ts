import { connectionsTable, gameTable } from "./tables";

export const wsApi = new sst.aws.ApiGatewayWebSocket("Websocket");
wsApi.route("$connect", {
	link: [connectionsTable],
	handler: "./packages/functions/src/connect.handler",
});
wsApi.route("$disconnect", {
	link: [connectionsTable],
	handler: "./packages/functions/src/disconnect.handler",
});

export const restApi = new sst.aws.ApiGatewayV2("Rest", {
	link: [gameTable],
});
restApi.route("POST /game", "./packages/functions/src/game/create.handler");
