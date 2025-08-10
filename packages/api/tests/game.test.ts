import { describe, expect, it } from "vitest";
import { mockDynamoDB } from "./mocks/dynamo";

mockDynamoDB();

import app from "../src";

describe("/game route", () => {
	describe("POST /game", () => {
		it("should create a new game and return the game id", async () => {
			const res = await app.request("/game", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ hostId: "test-user-id" }),
			});
			expect(res.status).toBe(200);
			expect((await res.json()).gameId).toMatch(/^[a-zA-Z0-9]{4}$/);
		});
	});
});
