"use client"
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react"
import type { TaskModel } from "../../generated/prisma/models/Task"

type TaskContextProps = {
  children: React.ReactNode
  initialTasks: Record<number, number[]>
  initialColumns: Record<number, string>
  taskMap: Record<number, TaskModel>
}

type TaskContextType = {
  tasks: Record<number, number[]>
  setTasks: Dispatch<SetStateAction<Record<number, number[]>>>
  columns: Record<number, string>,
  taskMap: Record<number, TaskModel>
}

export const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children, initialTasks, initialColumns, taskMap }:TaskContextProps) {
  const [tasks, setTasks] = useState<Record<number, number[]>>(initialTasks)

  return (
    <TaskContext.Provider value={{ tasks, setTasks, columns: initialColumns, taskMap: taskMap }} >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTasks must be used within a TaskProvider")
  return context
}