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
  addTask: (task:TaskModel) => void
}

export const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children, initialTasks, initialColumns, taskMap: initialTaskMap }: TaskContextProps) {
  const [tasks, setTasks] = useState<Record<string, string[]>>(initialTasks)
  const [taskMap, setTaskMap] = useState<Record<string, TaskModel>>(initialTaskMap)

  function addTask(task: TaskModel) {
    setTasks(prev => (
      {
        ...prev,
        [task.columnId]: [...prev[task.columnId], task.id]
      }
    ))
    setTaskMap(prev => ({
      ...prev,
      [task.id]: task,
    }))
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, columns: initialColumns, taskMap, addTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTasks must be used within a TaskProvider")
  return context
}

