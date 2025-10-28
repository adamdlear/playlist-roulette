import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors"; // Import cors
import { authMiddleware } from "./middleware/auth";
import { authServer } from "./auth/issuer";
import game from "./routes/game";
import { User } from "./auth/subjects";

export type Env = {
	Variables: {
		user: User;
	};
};

const app = new Hono<Env>();

const appUrl = process.env.WEB_APP_URL ?? "http://localhost:3000";

app.use(
	"*",
	cors({
		origin: [appUrl].filter(Boolean),
		allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
		allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
		exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use("/api/*", authMiddleware);

const routes = app.route("/", authServer).route("/api/game", game);

export const handler = handle(app);
export type AppType = typeof routes;

export default app;
