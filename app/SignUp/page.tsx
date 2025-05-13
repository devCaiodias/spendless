/* eslint-disable @next/next/no-img-element */
import { DollarSign } from "lucide-react"
import { CreateAccountForm } from "@/components/auth/create-account-form"
import login from "@/app/func/login";
import ThemeMode from "@/components/user-app/use-app-theme";

export default async function CreateAccountPage() {
    // Se o user Estiver logado
    await login()

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-between gap-2">
            <a href="#" className="flex items-center gap-2 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <DollarSign className="size-4" />
                </div>
                Spend Less
            </a>
            <ThemeMode />
            </div>
            <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
                <CreateAccountForm />
            </div>
            </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
            <img
            src="https://i.pinimg.com/1200x/a2/cb/39/a2cb39b6752c606f00d7c07cc588d0bd.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
            />
        </div>
        </div>
    )
}