import { vi } from "vitest";

export const mockSend = vi.fn();

export function mockDynamoDB() {
	vi.mock("@aws-sdk/client-dynamodb", () => {
		return {
			DynamoDBClient: vi.fn().mockImplementation(() => ({
				send: mockSend,
			})),
			PutItemCommand: vi.fn((args) => ({ ...args })),
			GetItemCommand: vi.fn((args) => ({ ...args })),
		};
	});
}
