export const wsApi = new sst.aws.ApiGatewayWebSocket("WebsocketApi");
wsApi.route("$connect", "./packages/functions/src/connect.handler");
wsApi.route("$disconnect", "./packages/functions/src/disconnect.handler");
