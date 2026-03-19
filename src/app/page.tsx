import ChartGrid from "@/components/charts/ChartGrid";
import { TaskProvider } from "@/context/TaskContext";
import { prisma } from "@/lib/prisma";

export default async function Home() {

  const tasksData = await prisma.task.findMany()
  const columnsData = await prisma.column.findMany({ orderBy: { order: "asc" } })
  const usersData = await prisma.user.findMany()
  const assigneesData = await prisma.taskAssignee.findMany()

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
  const userMap: Record<number, typeof usersData[0]> = {}
  for (const user of usersData) {
    userMap[user.id] = user
  }

  const taskAssignees: Record<string, number[]> = {}
  for (const task of tasksData) {
    taskAssignees[task.id] = []
  }
  for (const assignee of assigneesData) {
    taskAssignees[assignee.taskId].push(assignee.userId)
  }

  return (
    <TaskProvider
      initialTasks={initialTasks}
      initialColumns={initialColumns}
      taskMap={taskMap}
      taskAssignees={taskAssignees}
      userMap={userMap}
    >
      <ChartGrid />
    </TaskProvider>
  );
}

export const dynamic = 'force-dynamic'
