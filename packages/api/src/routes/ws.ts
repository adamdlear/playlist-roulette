import { Context, Hono } from "hono";
import { Resource } from "sst/resource";

const app = new Hono();

app.get("/", async (c: Context) => {
	return c.json({ url: Resource.WebsocketApi.url });
});

export default app;
