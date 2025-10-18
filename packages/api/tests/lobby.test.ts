import { afterEach, describe, it, expect, vi } from "vitest";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { handleConnect } from "@/ws/routes/connect";
import {
	ApiGatewayManagementApiClient,
	PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

vi.mock("@/auth/client", () => ({
	authClient: {
		verify: vi.fn().mockResolvedValue({
			subject: {
				properties: {
					id: "2",
					name: "Player 2",
				},
			},
		}),
	},
}));

vi.mock("@aws-sdk/client-apigatewaymanagementapi", () => {
	return {
		ApiGatewayManagementApiClient: vi.fn(),
		PostToConnectionCommand: vi.fn(),
	};
});

const ddbMock = mockClient(DynamoDBDocumentClient);
const wsMock = mockClient(ApiGatewayManagementApiClient);

describe("Lobby feature", () => {
	afterEach(() => {
		ddbMock.reset();
		wsMock.reset();
		vi.restoreAllMocks();
	});

	it("should notify all players in the lobby when a new player joins", async () => {
		const players = [
			{
				id: "1",
				name: "Player 1",
				connectionId: "conn1",
			},
			{
				id: "2",
				name: "Player 2",
				connectionId: "conn2",
			},
		];

		ddbMock.on(UpdateCommand).resolves({ Attributes: { players } });
		wsMock.on(PostToConnectionCommand).resolves({});

		const event = {
			queryStringParameters: {
				token: "test-token",
				gameId: "test-game",
			},
			requestContext: {
				connectionId: "conn2",
			},
		} as any;

		const result = await handleConnect(event);

		expect(result.statusCode).toBe(200);
		expect(wsMock.calls().length).toBe(2);

		const firstCall = wsMock.call(0);
		expect(firstCall.args[0].input).toEqual({
			ConnectionId: "conn1",
			Data: JSON.stringify({
				type: "player-joined",
				body: { players },
			}),
		});

		const secondCall = wsMock.call(1);
		expect(secondCall.args[0].input).toEqual({
			ConnectionId: "conn2",
			Data: JSON.stringify({
				type: "player-joined",
				body: { players },
			}),
		});
	});
});
