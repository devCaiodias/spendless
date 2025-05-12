import Sidebar from "@/components/user-app/user-app-sidebar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import Dashbord from "@/components/user-app/user-app-dashbord"
import AddTransation from "@/components/user-app/use-app-add-transaction"
import TableTransaction from "@/components/user-app/use-app-table-transaction"


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

            <div className="p-5 w-all border border-black mx-20">
                <AddTransation />
            </div>

            <Dashbord />

            <div className="p-5 w-all mx-20">
                <TableTransaction />
            </div>
        </>
    )
}