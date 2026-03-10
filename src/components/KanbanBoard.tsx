"use client"
import KanbanColumn from "./KanbanColumn";
import { columns, initialTasks } from "@/data/tasks"
import type { Task, ColumnId } from "@/data/tasks"
import { useState } from "react"
import { DragDropProvider } from '@dnd-kit/react'

export default function KanbanBoard() {

    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    return (
        <DragDropProvider
            onDragEnd={({ operation, canceled }) => {
                console.log('canceled:', canceled)
                console.log('source:', operation.source?.id)
                console.log('target:', operation.target?.id)
                if (canceled) return
                const { source, target } = operation
                if (!target) return
                if (!source) return
                setTasks((tasks) => tasks.map((task) => (
                    task.id === source.id
                        ? { ...task, columnId: target.id as ColumnId }
                        : { ...task })))
            }}
        >
            <div className="flex gap-6 w-full h-full">
                {columns.map((column) => (
                    <KanbanColumn key={column.id} column={column} tasks={tasks.filter((task) => task.columnId === column.id)} />
                ))}
            </div>
        </DragDropProvider>
    )
}