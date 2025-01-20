import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            profileId: string;
        } & DefaultSession["user"];
    }
}
