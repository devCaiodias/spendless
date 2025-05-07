'use client'
/* eslint-disable @next/next/no-html-link-for-pages */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"

import * as z from "zod"
import { useRouter } from "next/navigation" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Montar logica de Validação 
const formSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Must be valid Email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must have at least 6 characters"
    }).max(12, {
        message: "Password must have at least 12 characters"
    })
})

export function CreateAccountForm() {
    
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

            const {data: {user}} = await supabase.auth.signUp({
                email,
                password
            })

            if(user) {
                form.reset()
                router.refresh()
            }
        } catch (error) {
            console.log("CreateAccontForm ", error)
        }
    }
    

    return (
        <>
        
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-balance text-sm text-muted-foreground">
            Create your email below to your account
            </p>
        </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>
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
                    Create account
                    </Button>
                </div>
                </form>
        </Form>
        
        <div className="text-center text-sm">
            Have an account?{" "}
            <a href="/" className="underline underline-offset-4">
            Sign in
            </a>
        </div>
        </>
    )
}
