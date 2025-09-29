import { vi } from "vitest";

export const mockDynamoSend = vi.fn();

export function mockDynamoDB() {
	vi.mock("sst/resource", () => ({
		Resource: {
			Connections: { name: "ConnectionsTable" },
		},
	}));

	vi.mock("@aws-sdk/client-dynamodb", () => {
		return {
			DynamoDBClient: vi.fn().mockImplementation(() => ({
				send: mockDynamoSend,
			})),
			PutItemCommand: vi.fn((args) => ({ ...args })),
			DeleteItemCommand: vi.fn((args) => ({ ...args })),
		};
	});
}
