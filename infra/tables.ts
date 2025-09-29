export const authTable = new sst.aws.Dynamo("Auth", {
	fields: {
		pk: "string",
		sk: "string",
		GSI1PK: "string",
		GSI1SK: "string",
	},
	primaryIndex: { hashKey: "pk", rangeKey: "sk" },
	globalIndexes: { GSI1: { hashKey: "GSI1PK", rangeKey: "GSI1SK" } },
	ttl: "expires",
});

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
