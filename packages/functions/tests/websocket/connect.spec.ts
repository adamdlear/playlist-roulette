import { beforeEach, describe, expect, it } from "vitest";
import { mockDynamoDB, mockSend } from "../mocks/dynamo";

mockDynamoDB();

import { handleConnect } from "../../src/websocket/connect";

describe("handleConnect", () => {
	beforeEach(() => {
		mockSend.mockClear();
	});

	it("returns 200 when DynamoDB succeeds", async () => {
		// Arrange
		mockSend.mockResolvedValueOnce({});

		const event = { requestContext: { connectionId: "abc123" } } as any;

		// Act
		const result = await handleConnect(event);

		// Assert
		expect(mockSend).toHaveBeenCalledTimes(1);
		expect(result).toEqual({ statusCode: 200 });
	});

	it("returns 500 when DynamoDB fails", async () => {
		// Arrange
		mockSend.mockRejectedValueOnce(new Error("DB Error"));

		const event = { requestContext: { connectionId: "xyz789" } } as any;

		// Act
		const result = await handleConnect(event);

		// Assert
		expect(result).toEqual({
			statusCode: 500,
			body: "Could not create player connection",
		});
	});
});
