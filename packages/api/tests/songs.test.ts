import { assert, describe, it } from "vitest";
import { mockDynamoDB } from "./mocks/dynamo";

mockDynamoDB();

describe("/songs route", () => {
	describe("POST /songs/random", () => {
		it("should get a random song from the players playlists", async () => {
			assert(true);
		});
	});
});
