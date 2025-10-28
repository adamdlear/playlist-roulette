import { Resource } from "sst";
import {
	DeleteCommand,
	DeleteCommandOutput,
	GetCommand,
	GetCommandOutput,
	PutCommand,
	PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { getClient } from "@/db/client";

export const getPlayerConnection = (
	connectionId: string,
): Promise<GetCommandOutput> => {
	const ddbDocClient = getClient();
	const getConnCommand = new GetCommand({
		TableName: Resource.Connections.name,
		Key: {
			PK: connectionId,
		},
	});
	return ddbDocClient.send(getConnCommand);
};

export const putPlayerConnection = (
	connectionId: string,
	gameId: string,
): Promise<PutCommandOutput> => {
	const ddbDocClient = getClient();
	const putConnectionCommand = new PutCommand({
		TableName: Resource.Connections.name,
		Item: {
			PK: connectionId,
			gameId: gameId,
			ttl: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // 2 hours
		},
	});
	return ddbDocClient.send(putConnectionCommand);
};

export const deletePlayerConnection = (
	connectionId: string,
): Promise<DeleteCommandOutput> => {
	const ddbDocClient = getClient();
	const deleteConnCommand = new DeleteCommand({
		TableName: Resource.Connections.name,
		Key: {
			PK: connectionId,
		},
	});
	return ddbDocClient.send(deleteConnCommand);
};
