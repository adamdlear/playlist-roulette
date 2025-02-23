import { Resource } from "sst";

export const connectWebSocket = async () => {
    try {
        const socket = new WebSocket(Resource.Websocket.url);

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onerror = (error) => {
            console.error("WebSocket connection error:", error);
        };

        return socket;
    } catch (error) {
        console.error("WebSocket connection failed:", error);
        return null;
    }
};
