export const connectionsTable = new sst.aws.Dynamo("Connections", {
	fields: {
		PK: "string",
	},
	primaryIndex: { hashKey: "PK" },
	ttl: "ttl",
});

export const gameTable = new sst.aws.Dynamo("Games", {
	fields: {
		PK: "string",
	},
	primaryIndex: { hashKey: "PK" },
});
