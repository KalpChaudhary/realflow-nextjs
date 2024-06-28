"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { FormSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { actionLoginUser, signInWithGithub } from "@/lib/server-action/auth-actions"
import { toast } from "@/components/ui/use-toast"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    FormType?: 'login' | 'signup'
}



export function UserAuthForm({ className, ...props }: UserAuthFormProps) {


    const pathname = usePathname()
    const router = useRouter()



    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const isLoading = form.formState.isSubmitting;




    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => {

        const { data, error } = await actionLoginUser(formData)
        if (error) {
            form.reset()
            return toast({
                title: "Something went wrong.",
                description: "Invalid Credentials. Please try again.",
                variant: "destructive",
            })
            
        }

        router.push('/dashboard')
    }


    const onSubmitUsingGithub = async () => {


        const { data, error } = await signInWithGithub();

        if (error) {
            return toast({
                title: "Something went wrong.",
                description: error.message,
                variant: "destructive",
            })
        }


        console.log("data:", data);
        router.push('/dashboard')


    }





    return (

        <Form {...form}>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onChange={() => {


                }} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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

                        <p className="text-sm text-gray-400">Don&apos;t have an account? &nbsp;
                            <a className="text-primary" href="/signup">SignUp</a>
                        </p>

                        <Button className="mt-3" type='submit' disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In with Email
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
                    <Button className="w-full" variant="outline" type="button" disabled={isLoading} onClick={() => onSubmitUsingGithub()}>
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

    )


}
