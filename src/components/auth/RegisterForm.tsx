"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const RegisterSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function RegisterForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        setIsPending(true);
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            setSuccess("Sign-up successful! You can now log in.");
            setTimeout(() => {
                router.push("/auth/login");
            }, 150);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                    <h1 className={"text-3xl font-semibold"}>
                        <Link href={"/"}> 📝 Task Manager</Link>
                    </h1>
                    <p className="text-muted-foreground text-sm">{"Register"}</p>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="********"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Registering user" : "Register"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="text-center">
                <Button
                    variant={"link"}
                    className="font-normal w-full"
                    size={"sm"}
                    asChild
                >
                    <Link href={"/auth/login"}>{"Already have an account?"}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
