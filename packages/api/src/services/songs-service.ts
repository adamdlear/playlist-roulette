import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const getPlayers = async (gameId: string) => {
	const dynamodb = new DynamoDBClient();

	const getPlayersCommand = new QueryCommand({
		TableName: "PlayersTable",
		KeyConditionExpression: "gameId = :gameId",
		ExpressionAttributeValues: {
			gameId: { S: gameId },
		},
	});

	try {
		const response = await dynamodb.send(getPlayersCommand);
		const players = response.Items?.map((item) => unmarshall(item)) || [];
		return players;
	} catch (error) {
		throw new Error(`Could not get players for game ${gameId}`, {
			cause: error,
		});
	}
};
