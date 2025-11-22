import { Player } from "./player";

export type Game = {
	PK: string;
	hostId: string;
	createdAt: string;
	status?: "IN_PROGRESS";
	players?: Player[];
	startTime?: string;
};
