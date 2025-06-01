import { vi } from "vitest";
import { game } from "../../src/routes/game";

export function mockGenerateGameId() {
	vi.mock("../../src/routes/game/generateGameId", () => {
		return {
			generateGameId: () => "1111",
		};
	});
}
