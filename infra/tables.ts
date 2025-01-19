export const sessions = new sst.aws.Dynamo("SessionsTable", {
    fields: {
        sessionId: "string",
    },
    primaryIndex: { hashKey: "sessionId" },
});
