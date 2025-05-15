'use client'
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function AddTransation({ onTransactionSaved }: { onTransactionSaved: () => void }) {
    const [transaction, setTransaction] = useState({
        description: "",
        amount: "",
        category: "",
        date: "",
        type: ""
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [selectedType, setSelectedType] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
        setError('')

        const { description, amount, category, date, type } = transaction
        
        const supabase = createClientComponentClient()
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setError("Usuário não autenticado");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from('transactions').insert([
            {
                description,
                amount: parseFloat(amount),
                category,
                date,
                type,
                user_id: user.id
            }
        ]);

        if (error) {
            console.error("Error to insert: ", error.message)
            setError("Erro ao salvar a transação: " + error.message)
        } else {
            setSuccess(true)
            setTransaction({ description: '', amount: '', category: '', date: '', type: '' })
            setSelectedType('')
            onTransactionSaved()

            setLoading(false)
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }

}
    

    return (
        <>
        
        <h2 className="font-bold mb-4">Add Transaction</h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row  items-center justify-between gap-4">

                <Input type="text" value={transaction.description} onChange={(e) => setTransaction({...transaction, description: e.target.value})} className="w-[250px]"  placeholder="Description"  required/>
                <Input type="number" value={transaction.amount} onChange={(e) => setTransaction({...transaction, amount: e.target.value})} className="w-[200px]" placeholder="Amount" />
                <Input type="text" value={transaction.category} onChange={(e) => setTransaction({...transaction, category: e.target.value})} className="w-[200px]" placeholder="Category" />
                <Input type="date" value={transaction.date} onChange={(e) => setTransaction({...transaction, date: e.target.value})} className="w-[200px]" placeholder="Date" />
                <Select value={selectedType} onValueChange={(value) => {setSelectedType(value); setTransaction({ ...transaction, type: value })}}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>


                <Button type="submit" disabled={loading}> {loading ? 'Saving...' : 'Save your Transaction'}</Button>
            </form>
            {success && <p className="text-green-600">Transaction saved successfully!</p>}
            {error && <p className="text-red-600">{error}</p>}
        </>
    )
}