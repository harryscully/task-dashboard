"use client"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useTasks } from "@/context/TaskContext";

const chartConfig = {
    count: {
        label: "Count"
    },
    HIGH: {
        label: "High",
        color: "var(--chart-1)",
    },
    MEDIUM: {
        label: "Medium",
        color: "var(--chart-2)",
    },
    LOW: {
        label: "Low",
        color: "var(--chart-3)",
    }
} satisfies ChartConfig

export default function ChartPie() {

    const { tasks, taskMap } = useTasks()
    
    const allTasks = Object.values(taskMap)
    const totalTasks = allTasks.length

    const chartData = (["HIGH", "MEDIUM", "LOW"]).map(priority => ({
        priority,
        count: allTasks.filter(t => t.priority === priority).length,
        fill: `var(--color-${priority})`
    }))


    return (
        <Card className="flex flex-col w-full sm:w-96">
            <CardHeader>
                <CardTitle>
                    Tasks by Priority
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-72"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="priority"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalTasks.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Tasks
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}