import { auth } from "@/auth";
import { ProviderSigninDialog } from "./provider-signin-dialog";

export const UpdateGameButton = async ({ ...props }) => {
    const session = await auth();

    if (!session) {
        return <ProviderSigninDialog />;
    } else {
        return null;
    }
};
