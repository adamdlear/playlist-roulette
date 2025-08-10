"use client";

import { createContext, useEffect, useRef } from "react";

export const GameContext = createContext<
	Record<string, CallableFunction> | undefined
>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const wsRef = useRef<WebSocket | null>(null);

	const connect = async (websocketUrl: string): Promise<void> => {
		return new Promise((resolve, reject) => {
			try {
				wsRef.current = new WebSocket(websocketUrl);

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
		connect,
	};

	return (
		<GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
	);
};
