"use client"
import KanbanColumn from "./KanbanColumn";
import { columns, initialTasks } from "@/data/tasks"
import type { ColumnId } from "@/data/tasks"
import { useState } from "react"
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'

const initialTasksRestructured: Record<ColumnId, string[]> = {
    "to-do": [],
    "in-progress": [],
    "review": [],
    "done": []
}

for (const task of initialTasks) {
    initialTasksRestructured[task.columnId].push(task.id)
}


export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Record<ColumnId, string[]>>(initialTasksRestructured)

    return (
        <DragDropProvider
            onDragOver={(event) => {
                setTasks((tasks) => move(tasks, event));
            }}
            onDragEnd={(event) => {
                if (event.canceled) return
                setTasks((tasks) => move(tasks, event))
            }}
        >
            <div className="flex gap-6 w-full h-full">
                {columns.map((column) => (
                    <KanbanColumn key={column.id} column={column} tasks={tasks[column.id]} />
                ))}
            </div>
        </DragDropProvider>
    )
}