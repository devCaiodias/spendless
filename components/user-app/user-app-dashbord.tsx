'use client'
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PieChart, Pie, Cell, Legend } from 'recharts'

type Transaction = {
    id: number
    description: string
    amount: number
    category: string
    date: string
    type: 'income' | 'expense'
}

export default function Dashbord() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [incomeTotal, setIncomeTotal] = useState(0)
    const [expenseTotal, setExpenseTotal] = useState(0)

    const fetchTransactions = async () => {
        const supabase = createClientComponentClient()
        const {data, error} = await supabase.from('transactions').select('*')

        if (!error && data) {
            setTransactions(data)
            
            const income = data.filter((tx: Transaction) => tx.type === 'income').reduce((acc: number, tx: Transaction) => acc + tx.amount, 0)
            const expense = data.filter((tx: Transaction) => tx.type === 'expense').reduce((acc: number, tx: Transaction) => acc + tx.amount, 0)
            setIncomeTotal(income)
            setExpenseTotal(expense)
        }
    }

    
    const totalBalance = incomeTotal - expenseTotal
    
    const expensesByCategory = transactions
    .filter(tx => tx.type === 'expense')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((acc: any, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount
        return acc
    }, {})
    
    const pieData = Object.keys(expensesByCategory).map((key) => ({
        name: key,
        value: expensesByCategory[key],
        }))

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#FF7F50']
    
    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <>
        <div className="grid border-none gap-3 m-4 mx-15 grid-cols-1 md:grid-cols-3">
            <Card className="h-[200px]">
                <CardHeader className="relative">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        ${totalBalance.toFixed(2)}
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="h-[200px]">
                <CardHeader className="relative">
                    <CardDescription>Total Income</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        ${incomeTotal.toFixed(2)}
                    </CardTitle>
                </CardHeader>
            </Card>
            <PieChart width={400} height={220}>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                    {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </div>
        </>
    )
}