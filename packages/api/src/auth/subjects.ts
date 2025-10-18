import { createSubjects } from "@openauthjs/openauth/subject";
import { InferInput, object, string } from "valibot";

const user = object({
	id: string(),
	name: string(),
	image: string(),
});

export const subjects = createSubjects({
	user,
});

export type User = InferInput<typeof user>;
