'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Alimentação', value: 400 },
    { name: 'Transporte', value: 300 },
    { name: 'Lazer', value: 300 },
    { name: 'Saúde', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ExpensesChart() {
    return (
        <div>
        <h2 className="text-lg font-bold mb-4">Despesas</h2>
            <PieChart className='border border-black rounded-2xl' width={400} height={300}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </div>
    );
}
