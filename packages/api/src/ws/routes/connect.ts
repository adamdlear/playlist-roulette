import { authClient } from "@/auth/client";
import { subjects } from "@/auth/subjects";
import { addPlayerToGame } from "@/services/games-service";
import {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyEventV2,
} from "aws-lambda";

export const handleConnect = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	const params = event.queryStringParameters;
	if (!params) {
		return { statusCode: 400 };
	}

	const token = params.token;
	if (!token) {
		return { statusCode: 401 };
	}

	const verified = await authClient.verify(subjects, token);
	if (verified.err) {
		return { statusCode: 401 };
	}

	const gameId = params.gameId;
	if (!gameId) {
		return { statusCode: 400 };
	}

	// @ts-ignore
	const { connectionId } = event.requestContext;

	await addPlayerToGame(gameId, connectionId, verified.subject.properties);

	return { statusCode: 200 };
};
