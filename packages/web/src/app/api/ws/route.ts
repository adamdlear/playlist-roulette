import { Resource } from "sst";

export const GET = async () => {
	return Response.json({ url: Resource.WebsocketApi.url });
};
