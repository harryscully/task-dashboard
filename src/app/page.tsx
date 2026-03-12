"use client"
import ChartPie from "@/components/charts/ChartPie";
import ChartBar from "@/components/charts/ChartBar";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <ChartPie />
      <ChartBar />
    </div>
  );
}
