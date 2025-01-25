import { connectionsTable, gameTable } from "./tables";

export const wsApi = new sst.aws.ApiGatewayWebSocket("WebsocketApi");
wsApi.route("$connect", {
    link: [connectionsTable],
    handler: "./packages/functions/src/connect.handler",
});
wsApi.route("$disconnect", {
    link: [connectionsTable],
    handler: "./packages/functions/src/disconnect.handler",
});

export const restApi = new sst.aws.ApiGatewayV2("RestApi", {
    link: [gameTable],
});
restApi.route("PUT /game", "./packages/functions/src/game/put.handler");
