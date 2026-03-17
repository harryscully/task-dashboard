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
  setTaskMap: Dispatch<SetStateAction<Record<string, TaskModel>>>
  addTask: (task:TaskModel) => void,
  removeTask: (task:TaskModel) => void
  editTask: (task:TaskModel) => void
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

  function editTask(task: TaskModel) {
    const oldColumnId = taskMap[task.id].columnId
    setTasks(prev => {
      if (oldColumnId == task.columnId) return prev
      return {
        ...prev,
        [oldColumnId]: prev[task.columnId].filter(id => id !== task.id),
        [task.columnId]: [...prev[task.columnId], task.id]
      }
    })
    setTaskMap(prev => ({
      ...prev,
      [task.id]: task
    }))
  }

  function removeTask(task: TaskModel) {
    setTasks(prev => (
      {
        ...prev,
        [task.columnId]: prev[task.columnId].filter(id => id !== task.id)
      }
    ))
    setTaskMap(prev => {
      const newMap = {...prev}
      delete newMap[task.id]
      return newMap
    })
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, columns: initialColumns, taskMap, setTaskMap, addTask, removeTask, editTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTasks must be used within a TaskProvider")
  return context
}

