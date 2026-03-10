import KanbanBoard from "@/components/KanbanBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks"
};

export default function Tasks() {
  return (
    <div className="h-full">
      <KanbanBoard />
    </div>
  );
}
