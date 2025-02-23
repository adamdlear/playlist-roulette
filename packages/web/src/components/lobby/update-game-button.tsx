import { auth } from "@/auth";
import { ProviderSigninDialog } from "./provider-signin-dialog";

export const UpdateGameButton = async () => {
	const session = await auth();

	if (!session) {
		return <ProviderSigninDialog />;
	} else {
		return null;
	}
};
