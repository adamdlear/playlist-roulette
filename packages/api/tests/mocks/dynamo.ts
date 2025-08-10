import { vi } from "vitest";

export const mockSend = vi.fn();

export function mockDynamoDB() {
	vi.mock("sst/resource", () => ({
		Resource: {
			Games: { name: "GamesTable" },
		},
	}));

	vi.mock("@aws-sdk/client-dynamodb", () => {
		return {
			DynamoDBClient: vi.fn().mockImplementation(() => ({
				send: mockSend,
			})),
			PutItemCommand: vi.fn((args) => ({ ...args })),
			GetItemCommand: vi.fn((args) => ({ ...args })),
			UpdateItemCommand: vi.fn((args) => ({ ...args })),
		};
	});
}
