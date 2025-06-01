import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const game = new Hono();

const dynamodb = new DynamoDBClient();

game.post("/", async (c: Context) => {
	const body = await c.req.json();

	const { hostId } = body;
	const gameId = generateGameId();

	const putGameIdCommand = new PutItemCommand({
		TableName: "Games",
		Item: {
			gameId: { S: gameId },
			hostId: { S: hostId },
			startTime: { S: Date.now().toString() },
		},
	});

	try {
		dynamodb.send(putGameIdCommand);
		return c.json({ gameId });
	} catch (error) {
		console.error(error);
		throw new HTTPException(400, {
			message: `Error creating the job: ${error}`,
		});
	}
});

export const generateGameId = () => {
	return Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
};
