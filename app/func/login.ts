'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"

export default async function login() {
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
}