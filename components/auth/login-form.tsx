'use client'
import { cn } from "@/lib/utils"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const formSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Must be valid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must have at least 6 characters"
    }).max(12, {
        message: "Password must have at least 12 characters"
    })
})

export function LoginForm() {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const supabase = createClientComponentClient()

            const {email, password} = values

            const {} = await supabase.auth.signInWithPassword({
                email,
                password
            })

            form.reset()
            router.refresh()
        } catch (error) {
            console.log("LoginForm ", error)
        }
    }

    
        
    return (

        <>
        
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                Enter your email below to login to your account
                </p>
            </div>
            <Form  {...form}>
                <form onClick={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>

                    <div className="grid gap-6 m-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className="w-full">
                            Login account
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/SignUp" className="underline underline-offset-4">
                Sign up
                </a>
            </div>

        </>
    )
}
