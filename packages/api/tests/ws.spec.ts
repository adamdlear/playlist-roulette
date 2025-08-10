import { describe, expect, it } from "vitest";
import { mockWebsocketApi } from "./mocks/wsapi";

mockWebsocketApi();

import app from "../src";

describe("/ws route", () => {
	describe("GET /", () => {
		it("should return the url for the websocket api", async () => {
			// Act
			const res = await app.request("/ws", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			// Assert
			expect(res.status).toBe(200);
			expect(data.url).toEqual("ws://localhost:8080");
		});
	});
});
