"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useTasks } from "@/context/TaskContext";

const chartConfig = {
    count: {
        label: "Count",
        color: "var(--chart-1)"
    }
} satisfies ChartConfig

export default function ChartBar() {

    const { tasks, columns } = useTasks()

    const chartData = Object.entries(columns).map(([id, title]) => ({
        column: title,
        count: tasks[id]?.length ?? 0
    }))

    return (
        <Card className="flex flex-col w-full sm:w-96">
            <CardHeader>
                <CardTitle>
                    Tasks by Status
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-72"
                >
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="column"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill="var(--color-count)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}