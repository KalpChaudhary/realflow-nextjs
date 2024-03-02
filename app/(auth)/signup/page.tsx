"use client";

import { UserAuthForm } from "@/components/user-auth-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface SignupPageProps {

}

const SignUpFormSchema = z.object({

    email: z.string().email({
        message: "Invalid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

const SignupPage: FunctionComponent<SignupPageProps> = () => {

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }

    })

    const onSubmit = (values: z.infer<typeof SignUpFormSchema>) => { }

    const signUpHandler = () => { }

    const isLoading = form.formState.isSubmitting;

    return (

        <>
            <div className="container relative  h-full flex-col items-center justify-center mt-20 md:mt-0 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                <div className="relative lg:block hidden h-full flex-col bg-muted">
                    <Image
                        src="/login-side-img.jpg"
                        alt="Hero"
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                            filter: 'sepia(75%)',

                        }}
                        fill
                        objectFit="cover"
                        quality={100}
                    />

                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 mt-16 md:mt-0 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        {/* <UserAuthForm /> */}
                        <Form {...form}>
                            <div className="grid gap-6">
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="username@email.com" {...field} />
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
                                                    <FormControl>
                                                        <Input placeholder="Password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Confirm Password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <p className="text-sm text-gray-400">Already have an account? &nbsp;
                                            <a className="text-primary" href="/login">Login</a>
                                        </p>

                                        <Button className="mt-3" type='submit' disabled={isLoading}>
                                            {isLoading && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Sign Up with Email
                                        </Button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="w-full" variant="outline" type="button" disabled={isLoading}>
                                        {isLoading ? (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Icons.gitHub className="mr-2 h-4 w-4" />
                                        )}{" "}
                                        Github
                                    </Button>
                                </form>

                            </div>
                        </Form>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupPage;