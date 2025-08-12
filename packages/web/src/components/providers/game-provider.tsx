"use client";

import { addPlayerToGame } from "@/actions/game/players";
import { Player } from "@/types/player";
import { createContext, useEffect, useRef } from "react";

interface GameContextType {
	joinGame: (gameId: string, player: Player) => Promise<void>;
}

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const wsRef = useRef<WebSocket | null>(null);

	const joinGame = async (gameId: string, player: Player): Promise<void> => {
		connect();
		addPlayerToGame(gameId, player);
	};

	const connect = async (): Promise<void> => {
		const getWsUrlResponse = await fetch("/api/ws");
		const { url } = await getWsUrlResponse.json();

		return new Promise((resolve, reject) => {
			try {
				wsRef.current = new WebSocket(url);

				wsRef.current.onopen = () => {
					console.log("Connected to websocket");
					resolve();
				};

				wsRef.current.onerror = (error) => {
					console.error("Websocket error: ", error);
					reject(error);
				};
			} catch (error) {
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
