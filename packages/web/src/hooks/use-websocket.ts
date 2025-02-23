import { WebSocketContext } from "@/components/providers/websocket-provider";
import { useContext } from "react";

export const useWebSocket = () => {
	const context = useContext(WebSocketContext);
	if (!context) {
		throw new Error("useWebSocket must be used within a WebSocketProvider");
	}
	return context;
};
