import { signOut } from "@/auth";
import { Button } from "../ui/button";

export const SpotifySignout = () => {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button>Signout of Spotify</Button>
        </form>
    );
};
