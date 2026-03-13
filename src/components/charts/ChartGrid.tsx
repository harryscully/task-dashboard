"use client"
import ChartBar from "./ChartBar"
import ChartPie from "./ChartPie"

export default function ChartGrid() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <ChartPie />
            <ChartBar />
        </div>
    )
}
