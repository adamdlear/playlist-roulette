import { vi } from "vitest";

export function mockWebsocketApi() {
	vi.mock("sst/resource", () => ({
		Resource: {
			WebsocketApi: { name: "WebsocketApiApi", url: "ws://localhost:8080" },
		},
	}));
}
