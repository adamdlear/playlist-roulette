import {
	APIGatewayProxyEventV2,
	APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
import { handleConnect } from "@/ws/routes/connect";
import { handleDisconnect } from "@/ws/routes/disconnect";

export const handler = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const { routeKey } = event.requestContext;

	switch (routeKey) {
		case "$connect":
			return handleConnect(event);

		case "$disconnect":
			return handleDisconnect(event);

		case "$default":
			break;
	}

	return { statusCode: 200 };
};
