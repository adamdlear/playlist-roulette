import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export const UpdateGameButton = async ({ ...props }) => {
  const session = await auth();

  let text;
  if (!session) {
    text = "Join Game";
  } else {
    return false;
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    if (!session) {
      await signIn("spotify", formData);
    }
  };

  return (
    <form action={handleSubmit}>
      <Button {...props} type="submit">
        {text}
      </Button>
    </form>
  );
};
