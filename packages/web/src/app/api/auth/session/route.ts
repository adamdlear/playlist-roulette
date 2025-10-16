import { auth } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function GET() {
	const user = await auth();
	if (!user) {
		return NextResponse.json(null, { status: 401 });
	}
	return NextResponse.json(user);
}
