import { connectionsTable } from "./tables";

export const wsApi = new sst.aws.ApiGatewayWebSocket("WebsocketApi");
wsApi.route("$connect", {
    link: [connectionsTable],
    handler: "./packages/functions/src/connect.handler",
});
wsApi.route("$disconnect", {
    link: [connectionsTable],
    handler: "./packages/functions/src/disconnect.handler",
});
