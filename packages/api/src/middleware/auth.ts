import { Context, Next } from "hono";
import { authClient } from "../auth/client";
import { subjects } from "../auth/subjects";

export const authMiddleware = async (c: Context, next: Next) => {
	const authHeader = c.req.header("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const token = authHeader.substring(7);
	const verified = await authClient.verify(subjects, token);

	if (verified.err) {
		return c.json({ error: "Invalid token" }, 401);
	}

	c.set("user", verified.subject);
	await next();
};
