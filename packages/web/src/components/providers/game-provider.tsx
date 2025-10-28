"use client";

import { User } from "@/subjects";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";

interface GameContextType {
	players: User[];
	joinGame: (gameId: string, isHost: boolean) => Promise<void>;
}

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const [players, setPlayers] = useState<User[]>([]);
	const wsRef = useRef<WebSocket | null>(null);
	const router = useRouter();

	const joinGame = async (
		gameId: string,
		isHost: boolean = false,
	): Promise<void> => {
		await connect(gameId, isHost);
		router.push(`/lobby/${gameId}`);
	};

	const connect = async (gameId: string, isHost: boolean): Promise<void> => {
		const tokenResponse = await fetch("/api/auth/token");
		const { token } = await tokenResponse.json();
		const encodedToken = encodeURIComponent(token);

		const url = process.env.NEXT_PUBLIC_WS_URL;
		if (!url) throw new Error("Missing environment variable for websocket url");

		return new Promise((resolve, reject) => {
			try {
				wsRef.current = new WebSocket(
					`${url}?token=${encodedToken}&gameId=${gameId}&isHost=${isHost}`,
				);

				wsRef.current.onopen = async () => {
					console.log("calling ws.open");
					resolve();
				};

				wsRef.current.onclose = (event) => {
					console.log("calling ws.onclose with event ", event);
				};

				wsRef.current.onmessage = (event: MessageEvent<string>) => {
					const message = JSON.parse(event.data);
					console.log("calling ws.message with message ", message);

					switch (message.type) {
						case "player-joined":
							setPlayers(message.body.players);
							break;
						default:
							console.log("unknown message type", message.type);
					}
					resolve();
				};

				wsRef.current.onerror = (error) => {
					console.log("calling ws.onerror with error ", error);
					reject(error);
					if (wsRef.current) {
						wsRef.current.close();
					}
				};
			} catch (error) {
				console.error(error);
				reject(error);
			}
		});
	};

	useEffect(() => {
		return () => {
			if (wsRef.current) {
				wsRef.current.close();
			}
			// if (timerRef.current) {
			//   clearInterval(timerRef.current);
			// }
			// if (reconnectTimeoutRef.current) {
			//   clearTimeout(reconnectTimeoutRef.current);
			// }
		};
	}, []);

	const contextValue = {
		players,
		joinGame,
	};

	return (
		<GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
	);
};
