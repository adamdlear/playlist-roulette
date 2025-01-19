export const connectionsTable = new sst.aws.Dynamo("ConnectionsTable", {
    fields: {
        connectionId: "string",
    },
    primaryIndex: { hashKey: "connectionId" },
});

export const sessionsTable = new sst.aws.Dynamo("SessionsTable", {
    fields: {
        sessionId: "string",
    },
    primaryIndex: { hashKey: "sessionId" },
});
