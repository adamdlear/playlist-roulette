import { APIGatewayProxyWebsocketEventV2 } from "aws-lambda";

export interface WebSocketConnectEventV2
	extends APIGatewayProxyWebsocketEventV2 {
	queryStringParameters?: Record<string, string>;
}

export interface WebSocketDisconnectEventV2
	extends APIGatewayProxyWebsocketEventV2 {
	queryStringParameters?: Record<string, string>;
}
