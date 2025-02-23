class WebSocketManager {
	private socket: WebSocket | null = null;

	connect(url: string, onMessage: (message: string) => void) {
		if (this.socket) {
			console.warn("WebSocket is already connected.");
			return;
		}

		this.socket = new WebSocket(url);

		this.socket.onopen = () => {
			console.log("WebSocket connected.");
		};

		this.socket.onmessage = (event) => {
			console.log("Message received:", event.data);
			onMessage(event.data);
		};

		this.socket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		this.socket.onclose = () => {
			console.log("WebSocket disconnected.");
			this.socket = null;
		};
	}

	send(message: string) {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(message);
		} else {
			console.error("WebSocket is not open.");
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}
}

export const webSocketManager = new WebSocketManager();
