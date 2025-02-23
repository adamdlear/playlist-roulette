import { NextResponse } from "next/server";
import { Resource } from "sst";

export const GET = () => {
    const wsUrl = Resource.Websocket.url;
    return NextResponse.json({ wsUrl });
};
