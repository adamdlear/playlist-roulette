export const connectionsTable = new sst.aws.Dynamo("ConnectionsTable", {
    fields: {
        connectionId: "string",
    },
    primaryIndex: { hashKey: "connectionId" },
});

export const gameTable = new sst.aws.Dynamo("GameTable", {
    fields: {
        gameId: "string",
    },
    primaryIndex: { hashKey: "gameId" },
});
