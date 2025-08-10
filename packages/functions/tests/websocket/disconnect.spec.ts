import { beforeEach, describe, expect, it } from "vitest";
import { mockDynamoDB, mockSend } from "../mocks/dynamo";

mockDynamoDB();

import { handleDisconnect } from "../../src/websocket/disconnect";

describe("handleDisconnect", () => {
	beforeEach(() => {
		mockSend.mockClear();
	});

	it("returns 200 when DynamoDB succeeds", async () => {
		// Arrange
		mockSend.mockResolvedValueOnce({});

		const event = { requestContext: { connectionId: "abc123" } } as any;

		// Act
		const result = await handleDisconnect(event);

		// Assert
		expect(result).toEqual({ statusCode: 200 });
		expect(mockSend).toHaveBeenCalledExactlyOnceWith({
			TableName: "ConnectionsTable",
			Key: { PK: { S: "CONNECTION#abc123" } },
		});
	});

	it("returns 500 when DynamoDB fails", async () => {
		// Arrange
		mockSend.mockRejectedValueOnce(new Error("DB Error"));

		const event = { requestContext: { connectionId: "xyz789" } } as any;

		// Act
		const result = await handleDisconnect(event);

		// Assert
		expect(result).toEqual({
			statusCode: 500,
			body: "Could not delete player connection",
		});
	});
});
