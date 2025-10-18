import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { HTTPException } from "hono/http-exception";
import { Resource } from "sst";
import { getClient } from "../db/client";
import { VerifyResult } from "@openauthjs/openauth/client";
import { User } from "@/auth/subjects";

const generateGameId = () => {
	return Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
};

export const createGame = async (hostId: string) => {
	const ddbDocClient = getClient();

	const gameId = generateGameId();

	const putGameCommand = new PutCommand({
		TableName: Resource.Games.name,
		Item: {
			PK: `GAME#${gameId}`,
			hostId: hostId,
			createdAt: new Date().toISOString(),
		},
	});

	try {
		await ddbDocClient.send(putGameCommand);
		return gameId;
	} catch (error) {
		console.error(error);
		throw new HTTPException(400, {
			message: `Error creating the game: ${error}`,
		});
	}
};

export const addPlayerToGame = async (
	gameId: string,
	connectionId: string,
	user: User,
) => {
	const ddbDocClient = getClient();

	const updateGameCommand = new UpdateCommand({
		TableName: Resource.Games.name,
		Key: {
			PK: `GAME#${gameId}`,
		},
		UpdateExpression:
			"SET players = list_append(if_not_exists(players, :emptyList), :player)",
		ExpressionAttributeValues: {
			":player": [
				{
					connectionId: connectionId,
					...user,
				},
			],
			":emptyList": [],
		},
		ReturnValues: "ALL_NEW",
	});

	try {
		const { Attributes } = await ddbDocClient.send(updateGameCommand);
		return Attributes?.players ?? [];
	} catch (error) {
		console.error(error);
		throw new HTTPException(400, {
			message: `Error adding player to game: ${error}`,
		});
	}
};

export const startGame = async (gameId: string) => {
	const ddbDocClient = getClient();

	const updateGameCommand = new UpdateCommand({
		TableName: Resource.Games.name,
		Key: {
			gameId: `GAME#${gameId}`,
		},
		UpdateExpression: "SET GameStatus = :status, StartTime = :startTime",
		ExpressionAttributeValues: {
			":status": "IN_PROGRESS",
			":startTime": Date.now().toString(),
		},
	});

	try {
		await ddbDocClient.send(updateGameCommand);
		return { message: "Game started" };
	} catch (error) {
		console.error(error);
		throw new HTTPException(400, {
			message: `Error updating the game: ${error}`,
		});
	}
};
