import {
	APIGatewayProxyWebsocketEventV2,
	APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

export const handleConnect = (
	event: APIGatewayProxyWebsocketEventV2,
): APIGatewayProxyStructuredResultV2 => {
	return { statusCode: 200 };
};
