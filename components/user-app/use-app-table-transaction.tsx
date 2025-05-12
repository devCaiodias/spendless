'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { CopyX, Pen } from "lucide-react"
import React, { useEffect, useState } from "react"

import {Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type Transaction = {
    id: number
    description: string
    amount: number
    category: string
    date: string
    user_id?: string
}


export default function TableTransaction() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [editingTransactions, setEditingTrasactions] = useState<Transaction | null>(null)

    
    const fetchTransations = async () => {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.from('transactions').select("*").order("date", {ascending: false})

        if (error) {
            console.error("Error fetching transactions: ", error.message)
        } else {
            setTransactions(data)
        }
    }

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingTransactions) {
            return
        }

        const {id, ...updatedData } = editingTransactions
        
        const supabase = createClientComponentClient()
        const { data: {user}} = await supabase.auth.getUser()

        if (!user) {
            console.log("Usuario n autenticado")
            return
        }
        
        const { error } = await supabase.from('transactions').update(updatedData).eq("id", id)

        if (error) {
            console.error("Error to update: ", error.message)
        }else {
            setEditingTrasactions(null)
            fetchTransations()
        }
    }

    const handleSubmitDelete = async (id: number) => {
        const supabase = createClientComponentClient()
        const { data: {user}} = await supabase.auth.getUser()

        if(!user) {
            console.log("Usuario n autenticado")
            return
        }

        const {error} = await supabase.from('transactions').delete().eq("id", id)

        if (error) {
            console.error("Error deleting transaction: ", error.message)
        }else (
            fetchTransations()
        )
    }

    useEffect(() => {
        fetchTransations()
    }, )

    return (
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
                        {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell>{tx.description.toUpperCase()}</TableCell>
                            <TableCell>$ {tx.amount.toFixed(2)}</TableCell>
                            <TableCell>{tx.category.toLocaleUpperCase()}</TableCell>
                            <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                            <TableCell >
                                <div className="flex items-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="border-none" onClick={() => setEditingTrasactions(tx)}><Pen size={15} /> </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your transaction here. Click Save when you are done.
                                            </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleSubmitEdit} className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                Description
                                                </Label>
                                                <Input id="name" value={editingTransactions?.description ?? ""} onChange={(e) => setEditingTrasactions((prev) => prev ? {...prev, description: e.target.value} : null)} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                Amount
                                                </Label>
                                                <Input id="username" value={editingTransactions?.amount ?? ""} onChange={(e) => setEditingTrasactions((prev) => prev ? {...prev, amount: parseFloat(e.target.value)} : null)} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                Category
                                                </Label>
                                                <Input id="username" value={editingTransactions?.category ?? ""} onChange={(e) => setEditingTrasactions((prev) => prev ? {...prev, category: e.target.value} : null)} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                Date
                                                </Label>
                                                <Input id="username" value={editingTransactions?.date ?? ""} onChange={(e) => setEditingTrasactions((prev) => prev ? {...prev, date: e.target.value} : null)} className="col-span-3" />
                                            </div>
                                            <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                            </DialogFooter>
                                            </form>
                                        </DialogContent>
                                        </Dialog>
                                        <Button variant="ghost" onClick={() => handleSubmitDelete(tx.id)}>
                                            <CopyX size={15} />

                                        </Button>
                                </div>
                                </TableCell>

                        </TableRow>
                        ))}
                        
                </TableBody>
            </Table>
    )
}