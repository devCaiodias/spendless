import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"

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
        //  Se deslogar a conta vai para home
        if(logOut) {
            redirect("/", RedirectType.replace)
        }
    }
    
    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}