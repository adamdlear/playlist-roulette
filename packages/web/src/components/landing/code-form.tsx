"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { GameCodeInput } from "./code-input";

const FormSchema = z.object({
    code: z
        .string()
        .min(4, { message: "You game code must be 4 digits" })
        .max(4, { message: "You game code must be 4 digits" }),
});

export const GameCodeForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(`Joining game with code ${data.code}`);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex justify-center items-center gap-2"
            >
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <GameCodeInput maxLength={4} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={!form.formState.isValid}
                    className="px-3"
                >
                    <ArrowUp />
                </Button>
            </form>
        </Form>
    );
};