"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { logout } from "@/actions/auth";
import { Button } from "../ui/button";

export const SpotifySignout = () => {
	const router = useRouter();
	const { pending } = useFormStatus();

	useEffect(() => {
		if (!pending) {
			router.refresh();
		}
	}, [pending, router]);

	return (
		<form action={logout}>
			<Button>Signout of Spotify</Button>
		</form>
	);
};
