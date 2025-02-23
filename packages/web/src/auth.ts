import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Spotify],
	callbacks: {
		jwt({ token, profile }) {
			if (profile && profile.id) token.profileId = profile.id;
			return token;
		},
		session({ token, session }) {
			session.user.profileId = token.profileId as string;
			return session;
		},
	},
});
