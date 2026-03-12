"use client"
import KanbanColumn from "./KanbanColumn";
import { columns } from "@/data/tasks"
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import { useTasks } from "@/context/TaskContext";
import confetti from "canvas-confetti";
import { useState } from "react";

export default function KanbanBoard() {
    const { tasks, setTasks } = useTasks()
    const [sourceCol, setSourceCol] = useState<string | null>(null)

    return (
        <DragDropProvider
            onDragStart={(event) => {
                const sourceId = event.operation.source?.id as string
                const col = Object.entries(tasks).find(([_, ids]) => {
                    return ids.includes(sourceId)
                })?.[0]
                setSourceCol(col ?? null)
            }}
            onDragOver={(event) => {
                setTasks((tasks) => move(tasks, event));
            }}
            onDragEnd={(event) => {
                if (event.canceled) return
                const targetId = event.operation.target?.id as string
                const isTargetDone = tasks["done"].includes(targetId)
                if (isTargetDone && sourceCol !== "done") {
                    confetti({
                        angle: 270,
                        particleCount: 200,
                        spread: 80,
                        origin: { y: -0.3}
                    })
                }

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