"use client";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

interface JoinGameButtonProps {
    disabled: boolean;
    onSubmit: () => void;
}

export const JoinGameButton = ({ disabled, onSubmit }: JoinGameButtonProps) => {
    return (
        <Button disabled={disabled} onClick={onSubmit} className="px-3">
            <ArrowUp />
        </Button>
    );
};
