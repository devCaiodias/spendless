'use client'

import { useState } from "react"
import AddTransation from "./use-app-add-transaction"
import Dashbord from "./user-app-dashbord"
import TableTransaction from "./use-app-table-transaction"

export default function TransactionPage() {
    const [refresh, setRefresh] = useState(false)

    const triggerRefresh = () => {
        setRefresh(prev => !prev)
    }

    return (
        <>
            <div className="p-5 w-all border border-gray-400 mx-12 rounded-2xl">
                <AddTransation onTransactionSaved={triggerRefresh} />
            </div>

            <Dashbord refresh={refresh} />

            <div className="p-5 w-all mx-20">
                <TableTransaction onTransactionSaved={triggerRefresh} refresh={refresh} />
            </div>
        </>
    )
}