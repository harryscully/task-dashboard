"use client"
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react"
import type { TaskModel } from "../../generated/prisma/models/Task"

type TaskContextProps = {
  children: React.ReactNode
  initialTasks: Record<string, string[]>
  initialColumns: Record<string, string>
  taskMap: Record<string, TaskModel>
}

type TaskContextType = {
  tasks: Record<string, string[]>
  setTasks: Dispatch<SetStateAction<Record<string, string[]>>>
  columns: Record<string, string>
  taskMap: Record<string, TaskModel>
}

export const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children, initialTasks, initialColumns, taskMap }: TaskContextProps) {
  const [tasks, setTasks] = useState<Record<string, string[]>>(initialTasks)

  return (
    <TaskContext.Provider value={{ tasks, setTasks, columns: initialColumns, taskMap }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTasks must be used within a TaskProvider")
  return context
}