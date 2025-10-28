import { removePlayerFromGame } from "@/services/games-service";
import {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyEventV2,
} from "aws-lambda";

export const handleDisconnect = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	// @ts-ignore
	const { connectionId } = event.requestContext;
	await removePlayerFromGame(connectionId);
	return { statusCode: 200 };
};
