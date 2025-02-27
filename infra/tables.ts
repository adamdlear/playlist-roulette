export const connectionsTable = new sst.aws.Dynamo("Connections", {
	fields: {
		connectionId: "string",
	},
	primaryIndex: { hashKey: "connectionId" },
});

export const gameTable = new sst.aws.Dynamo("Games", {
	fields: {
		gameId: "string",
	},
	primaryIndex: { hashKey: "gameId" },
});
