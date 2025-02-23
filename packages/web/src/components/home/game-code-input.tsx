import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { GameCodeSlot } from "./game-code-slot";

interface GameCodeInputProps {
	maxLength?: number;
}

export const GameCodeInput = ({
	maxLength = 4,
	...props
}: GameCodeInputProps) => {
	return (
		<InputOTP maxLength={maxLength} {...props} pattern={REGEXP_ONLY_DIGITS}>
			<InputOTPGroup className="flex gap-2">
				<GameCodeSlot index={0} />
				<GameCodeSlot index={1} />
				<GameCodeSlot index={2} />
				<GameCodeSlot index={3} />
			</InputOTPGroup>
		</InputOTP>
	);
};
