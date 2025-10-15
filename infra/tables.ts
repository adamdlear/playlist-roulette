export const authTable = new sst.aws.Dynamo("AuthStorage", {
	fields: {
		pk: "string",
		sk: "string",
	},
	primaryIndex: { hashKey: "pk", rangeKey: "sk" },
	ttl: "expiry",
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
