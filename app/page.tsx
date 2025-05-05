/* eslint-disable @next/next/no-img-element */
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"
import { DollarSign } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RedirectType, redirect } from "next/navigation"
import { cookies } from "next/headers"
export default async function LoginPage() {
    let login = false 
    
    try {
        const supabase = createServerComponentClient({cookies})
        const {data: {session}} = await supabase.auth.getSession()

        if(session) {
            login = true
        }
        
    } catch (error) {
        console.log("Erro no login da conta", error)
    }finally {
        // Se tiver logado vai ser direcionado para pagina user-app
        if(login) {
            redirect("/user-app", RedirectType.replace)
        }
    }
    
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <DollarSign className="size-4" />
                </div>
                Spend Less
            </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
                <LoginForm />
            </div>
            </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
            <img
            src="https://i.pinimg.com/1200x/7b/a1/3f/7ba13fc353a43864af6592c79bcb3a2b.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
        </div>
    )
}