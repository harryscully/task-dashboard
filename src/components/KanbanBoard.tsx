"use client"
import KanbanColumn from "./KanbanColumn";
import { columns } from "@/data/tasks"
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import { useTasks } from "@/context/TaskContext";


export default function KanbanBoard() {
    const { tasks, setTasks } = useTasks()

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