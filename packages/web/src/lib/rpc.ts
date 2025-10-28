import { hc } from "hono/client";
import type { AppType } from "../../../api/src/index";

const getToken = async () => {
	const response = await fetch("/api/auth/token");
	if (!response.ok) throw new Error("Could not get authentication token");
	const { token } = await response.json();
	return token;
};

export const createClient = async () => {
	const token = await getToken();
	return hc<AppType>(process.env.NEXT_PUBLIC_API_URL!, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
