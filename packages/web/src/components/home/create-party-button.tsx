import { createGameAction } from "@/app/actions/create-game";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const CreatePartyButton = () => {
    const handleSubmit = async () => {
        "use server";
        const response = await createGameAction();
        if (!response) alert("Could not create game");
        redirect(`/lobby/${response.gameId}`);
    };

    return (
        <form action={handleSubmit}>
            <Button type="submit" className="w-full">
                Create a Party
            </Button>
        </form>
    );
};
