import { createClient } from "@openauthjs/openauth/client";
import { Resource } from "sst";

export const authClient = createClient({
	clientID: "hono-api",
	issuer: Resource.HttpApi.url + "/auth",
});
