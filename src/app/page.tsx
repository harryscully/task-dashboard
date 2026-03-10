import ChartPie from "@/components/charts/ChartPie";
import ChartBar from "@/components/charts/ChartBar";

export default function Home() {
  return (
    <div className="h-full flex flex-col sm:flex-row gap-8">
      <ChartPie />
      <ChartBar />
    </div>
  );
}
