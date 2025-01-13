import { cn } from "@/lib/utils";
import { InputOTPSlot } from "../ui/input-otp";

export const GameCodeSlot: React.FC<
    React.ComponentProps<typeof InputOTPSlot>
> = (props) => {
    return (
        <InputOTPSlot
            {...props}
            className={cn("border rounded", props.className)}
        />
    );
};
