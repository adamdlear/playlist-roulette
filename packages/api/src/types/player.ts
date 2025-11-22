export interface Player {
	id?: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	isHost?: boolean | null;
	connectionId?: string | null;
}
