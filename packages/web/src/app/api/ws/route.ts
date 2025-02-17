import { NextResponse } from "next/server";
import { Resource } from "sst";

export const GET = () => {
    const wsUrl = Resource.WebsocketApi.url;
    return NextResponse.json({ wsUrl });
};
