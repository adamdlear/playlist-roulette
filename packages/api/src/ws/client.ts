import {
	ApiGatewayManagementApiClient,
	PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
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
		console.error(error);
	}
};
