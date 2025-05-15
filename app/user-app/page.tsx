import Sidebar from "@/components/user-app/user-app-sidebar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import TransactionPage from "@/components/user-app/use-transaction-page"


export default async function UserApp() {

    let logOut = false

    try {
        const supabase = createServerComponentClient({cookies})
        const {data: {session}} = await supabase.auth.getSession()

        if(session) {
            logOut = true
        }
    } catch (error) {
        console.log("Erro no logOut da conta ", error)
    }finally{
        //  Se deslogar vai ser redirecionado para home
        if(!logOut) {
            redirect("/", RedirectType.replace)
        }
    }
    
    return (
        <>
                <Sidebar />

            <TransactionPage />

            
        </>
    )
}