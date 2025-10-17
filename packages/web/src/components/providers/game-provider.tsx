"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useRef } from "react";

interface GameContextType {
	joinGame: (gameId: string, isHost: boolean) => Promise<void>;
}

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const wsRef = useRef<WebSocket | null>(null);
	const router = useRouter();

	const joinGame = async (gameId: string, isHost: boolean): Promise<void> => {
		await connect(gameId, isHost);
		router.push(`/lobby/${gameId}`);
	};

	const connect = async (gameId: string, isHost: boolean): Promise<void> => {
		const wsResponse = await fetch("/api/ws");
		const { url } = await wsResponse.json();

		const tokenResponse = await fetch("/api/auth/token");
		const { token } = await tokenResponse.json();
		const encodedToken = encodeURIComponent(token);

		return new Promise((resolve, reject) => {
			try {
				wsRef.current = new WebSocket(
					`${url}?token=${encodedToken}&gameId=${gameId}&isHost=${isHost}`,
				);

				console.log("successfully connected to websocket");

				wsRef.current.onopen = async () => {
					console.log("calling ws.open");
					resolve();
				};

				wsRef.current.onmessage = (event: MessageEvent<string>) => {
					console.log(
						"calling ws.message with message ",
						JSON.parse(event.data),
					);
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
		joinGame,
	};

	return (
		<GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
	);
};
