import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks"
};

export default function Tasks() {
  return (
    <div className="h-full min-w-max">
      <KanbanBoard />
    </div>
  );
}
