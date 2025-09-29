import {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyWebsocketEventV2,
} from "aws-lambda";
import { handleConnect } from "./connect";
import { handleDisconnect } from "./disconnect";

export const handler = async (
	event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const { routeKey } = event.requestContext;

	try {
		switch (routeKey) {
			case "$connect":
				return handleConnect(event);

			case "$disconnect":
				return handleDisconnect(event);

			case "$default":
				return { statusCode: 200, body: "Message received" };

			default:
				return { statusCode: 404, body: `Unknown route: ${routeKey}` };
		}
	} catch (error) {
		return { statusCode: 500 };
	}
};
