import Sidebar from "@/components/user-app/user-app-sidebar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Dashbord from "@/components/user-app/user-app-dashbord"
// import { Table } from "@/components/ui/table"


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
                <h2 className="font-bold mb-4">Add Transaction</h2>
                <div className="flex flex-col md:flex-row  items-center justify-between gap-4">
                    <Input className="w-[250px]"  placeholder="Description" />
                    <Input className="w-[200px]" placeholder="Amount" />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Food">Food</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>Add</Button>
                </div>
            </div>

            <Dashbord />

            {/* <Table>

            </Table> */}
        </>
    )
}