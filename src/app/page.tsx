import ChartPie from "@/components/ChartPie";
import ChartBar from "@/components/ChartBar";

export default function Home() {
  return (
    <div className="h-full flex gap-8">
      <ChartPie />
      <ChartBar />
    </div>
  );
}
