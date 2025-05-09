import Sidebar from "@/components/user-app/user-app-sidebar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import Dashbord from "@/components/user-app/user-app-dashbord"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AddTransation from "@/components/user-app/use-app-add-transaction"


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
            <Table>
                <TableCaption>
                    Transaction List
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Salary</TableCell>
                        <TableCell>$ 2000.00</TableCell>
                        <TableCell>income</TableCell>
                        <TableCell>04/20/2024</TableCell>
                        <TableCell>E S</TableCell>
                        
                    </TableRow>
                </TableBody>
            </Table>
            </div>
        </>
    )
}