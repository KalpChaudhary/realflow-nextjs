"use client"

import { FunctionComponent, use } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { actionLoginUser, signInWithGithub } from "@/lib/server-action/auth-actions";

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserAuthForm } from "@/components/user-auth-form";
import Link from "next/link";
import Image from "next/image";


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})


interface LoginProps {
    username: string
    password: string
}

const Login: FunctionComponent<LoginProps> = () => {


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
                        }}
                        fill
                        objectFit="cover"
                        quality={100}
                    />

                </div>
                <div className="">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 mt-16 md:mt-0 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <Link
                                href="/"
                                className="
              w-full
              flex
              justify-left
              items-center"
                            >
                                <Image
                                    src="/cypresslogo.svg"
                                    alt="cypress Logo"
                                    width={50}
                                    height={50}
                                />
                                <span
                                    className="font-semibold
              dark:text-white text-4xl first-letter:ml-2"
                                >
                                    realflow.
                                </span>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <UserAuthForm />
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

export default Login;