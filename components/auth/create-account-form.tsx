/* eslint-disable @next/next/no-html-link-for-pages */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateAccountForm({
    className,
    ...props
    }: React.ComponentPropsWithoutRef<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-balance text-sm text-muted-foreground">
            Create your email below to your account
            </p>
        </div>
        <div className="grid gap-6">
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
            Create account
            </Button>
        </div>
        <div className="text-center text-sm">
            Have an account?{" "}
            <a href="/" className="underline underline-offset-4">
            Sign in
            </a>
        </div>
        </form>
    )
}
