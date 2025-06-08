import {
	DynamoDBClient,
	PutItemCommand,
	UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { Resource } from "sst/resource";

export const game = new Hono();

const dynamodb = new DynamoDBClient();

game.post("/", async (c: Context) => {
	const body = await c.req.json();

	const { hostId } = body;
	const gameId = generateGameId();

	const putGameIdCommand = new PutItemCommand({
		TableName: Resource.Games.name,
		Item: {
			gameId: { S: gameId },
			hostId: { S: hostId },
		},
	});

	try {
		await dynamodb.send(putGameIdCommand);
		return c.json({ gameId });
	} catch (error) {
		console.error(error);
		throw new HTTPException(400, {
			message: `Error creating the job: ${error}`,
		});
	}
});

game.post("/start/:gameId", async (c: Context) => {
	const gameId = c.req.param("gameId");

	const updateGameCommand = new UpdateItemCommand({
		TableName: Resource.Games.name,
		Key: {
			gameId: { S: gameId },
		},
		UpdateExpression: "SET GameStatus = :status, StartTime = :startTime",
		ExpressionAttributeValues: {
			":status": { S: "IN_PROGRESS" },
			":startTime": { N: Date.now().toString() },
		},
	});

	try {
		await dynamodb.send(updateGameCommand);
		return c.json({ message: "Game started" });
	} catch (error) {
		console.error(error);
		throw new HTTPException(400, {
			message: `Error updating the game: ${error}`,
		});
	}
});

export const generateGameId = () => {
	return Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
};
