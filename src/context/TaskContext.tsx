"use client"
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react"
import { initialTasksRestructured } from "@/data/tasks"
import type { ColumnId } from "@/data/tasks"

type TaskContextType = {
  tasks: Record<ColumnId, string[]>
  setTasks: Dispatch<SetStateAction<Record<ColumnId, string[]>>>
}

export const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({children}:{children:React.ReactNode}) {
    const [tasks, setTasks] = useState<Record<ColumnId, string[]>>(initialTasksRestructured)

    return (
        <TaskContext.Provider value={{tasks, setTasks}} >
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTasks must be used within a TaskProvider")
  return context
}