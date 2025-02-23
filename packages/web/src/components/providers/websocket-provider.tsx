import { webSocketManager } from "@/utils/WebSocketManager";
import type React from "react";
import { createContext, useState } from "react";

type WebSocketContextType = {
	connect: (url: string) => void;
	send: (message: string) => void;
	disconnect: () => void;
	connected: boolean;
};

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
	undefined,
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [connected, setConnected] = useState(false);

	const connect = (url: string) => {
		webSocketManager.connect(url, (message) => {
			console.log("Received message:", message);
		});
		setConnected(true);
	};

	const send = (message: string) => {
		webSocketManager.send(message);
	};

	const disconnect = () => {
		webSocketManager.disconnect();
		setConnected(false);
	};

	return (
		<WebSocketContext.Provider value={{ connect, send, disconnect, connected }}>
			{children}
		</WebSocketContext.Provider>
	);
};
