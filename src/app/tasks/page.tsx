import KanbanBoard from "@/components/kanban/KanbanBoard";
import { TaskProvider } from "@/context/TaskContext";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Tasks"
};

export default async function Tasks() {

  const tasksData = await prisma.task.findMany()
  const columnsData = await prisma.column.findMany()
  const tasksDataRestructured: Record<string, number[]> = {}
  for (const column of columnsData) {
    tasksDataRestructured[column.id.toString()] = []
  }
  for (const task of tasksData) {
    tasksDataRestructured[task.columnId.toString()].push(task.id)
  }

  const initialColumns: Record<number, string> = {}
  for (const column of columnsData) {
    initialColumns[column.id] = column.title
  }

  const taskMap: Record<number, typeof tasksData[0]> = {}
  for (const task of tasksData) {
    taskMap[task.id] = task
  }

  return (
    <TaskProvider initialTasks={tasksDataRestructured} initialColumns={initialColumns} taskMap={taskMap}>
      <div className="h-full min-w-max">
        <KanbanBoard />
      </div>
    </TaskProvider>
  );
}
