"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Session = {
	id: string;
	name: string;
	image?: string;
};

type SessionContextValue = {
	session: Session | null;
	status: "loading" | "authenticated" | "unauthenticated";
};

const SessionContext = createContext<SessionContextValue | undefined>(
	undefined,
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);
	const [status, setStatus] =
		useState<SessionContextValue["status"]>("loading");

	useEffect(() => {
		async function fetchSession() {
			try {
				const res = await fetch("/api/auth/session");
				if (res.ok) {
					const user = await res.json();
					setSession(user);
					setStatus("authenticated");
				} else {
					setSession(null);
					setStatus("unauthenticated");
				}
			} catch (error) {
				console.error("Failed to fetch session:", error);
				setSession(null);
				setStatus("unauthenticated");
			}
		}

		fetchSession();
	}, []);

	return (
		<SessionContext.Provider value={{ session, status }}>
			{children}
		</SessionContext.Provider>
	);
}

export function useSession() {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
}
