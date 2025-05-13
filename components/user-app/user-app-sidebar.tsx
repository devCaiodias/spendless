'use client'
import { DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ThemeMode from "./use-app-theme";


export default function Sidebar() {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }


    return (
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-between gap-2">
                <span className="flex items-center gap-2 font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <DollarSign className="size-4" />
                    </div>
                    Spend Less
                </span>
                <div className="flex items-center justify-center">
                    <a onClick={handleSignOut} className="flex items-center gap-2 font-medium cursor-pointer px-6">
                        Log out
                    </a>
                    <ThemeMode />


                </div>
            </div>

            
        </div>
    )
}