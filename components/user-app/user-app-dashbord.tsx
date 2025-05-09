'use client'
import { TrendingUpIcon } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

import dynamic from 'next/dynamic';

// Carrega dinamicamente no client
const ExpensesChart = dynamic(() => import('../user-app/user-app-expenseschart'), {
  ssr: false, // Desativa renderização no servidor
});


export default function Dashbord() {
    return (
        <>
        <div className="grid border-none gap-3 m-4 mx-15 grid-cols-1 md:grid-cols-2">
            <Card className="h-[200px]">
                <CardHeader className="relative">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        $1,250.00
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUpIcon className="size-3" />
                        +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <TrendingUpIcon className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Visitors for the last 6 months
                        </div>
                    </CardFooter>
            </Card>
            <Card className="h-[200px]">
                <CardHeader className="relative">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        $1,250.00
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUpIcon className="size-3" />
                        +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <TrendingUpIcon className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Visitors for the last 6 months
                        </div>
                    </CardFooter>

            </Card>

            <ExpensesChart />
        </div>
        </>
    )
}