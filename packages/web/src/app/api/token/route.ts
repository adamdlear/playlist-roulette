import { cookies } from "next/headers";

export async function GET() {
	const cookieStore = await cookies();
	const token = cookieStore.get("authjs.session-token")?.value;
	if (!token) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}
	console.log("sending token: ", token);
	console.log("using secret: ", process.env.AUTH_SECRET);
	return Response.json({ token });
}
