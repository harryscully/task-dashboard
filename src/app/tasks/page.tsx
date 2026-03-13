import KanbanBoard from "@/components/kanban/KanbanBoard";
import { TaskProvider } from "@/context/TaskContext";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Tasks"
};

export default async function Tasks() {

  const tasksData = await prisma.task.findMany()
  const columnsData = await prisma.column.findMany({orderBy: {order: "asc"}})

  const initialTasks: Record<string, string[]> = {}
  for (const column of columnsData) {
    initialTasks[column.id.toString()] = []
  }
  for (const task of tasksData) {
    initialTasks[task.columnId.toString()].push(task.id)
  }

  const initialColumns: Record<string, string> = {}
  for (const column of columnsData) {
    initialColumns[column.id] = column.title
  }

  const taskMap: Record<string, typeof tasksData[0]> = {}
  for (const task of tasksData) {
    taskMap[task.id] = task
  }

  return (
    <TaskProvider initialTasks={initialTasks} initialColumns={initialColumns} taskMap={taskMap}>
      <div className="h-full min-w-max">
        <KanbanBoard />
      </div>
    </TaskProvider>
  );
}

export const dynamic = 'force-dynamic'