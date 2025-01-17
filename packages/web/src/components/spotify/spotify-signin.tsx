import { signIn } from "@/auth";
import { Button } from "../ui/button";

export const SpotifySignin = () => {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("spotify", formData);
      }}
    >
      <Button type="submit">Signin with Spotify</Button>
    </form>
  );
};
