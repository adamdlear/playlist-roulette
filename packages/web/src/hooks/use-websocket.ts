import { useContext } from "react";
import { WebSocketContext } from "@/components/providers/websocket-provider";

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
