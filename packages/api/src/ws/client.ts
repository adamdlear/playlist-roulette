import {
	ApiGatewayManagementApiClient,
	GoneException,
	PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { removePlayerFromGame } from "@/services/games-service";
import { Resource } from "sst";

const ws = new ApiGatewayManagementApiClient({
	endpoint: Resource.WebsocketApi.managementEndpoint,
});

export const sendMessage = async (connectionId: string, payload: any) => {
	const command = new PostToConnectionCommand({
		ConnectionId: connectionId,
		Data: JSON.stringify(payload) as any,
	});

	try {
		await ws.send(command);
	} catch (error) {
		if (error instanceof GoneException) {
			await removePlayerFromGame(connectionId);
			return;
		}
		console.error(error);
	}
};
