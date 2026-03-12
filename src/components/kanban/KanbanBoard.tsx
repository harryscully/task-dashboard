"use client"
import KanbanColumn from "./KanbanColumn";
import { DragDropProvider } from '@dnd-kit/react'
import { useTasks } from "@/context/TaskContext";
import confetti from "canvas-confetti";
import { useState } from "react";

export default function KanbanBoard() {
    const { tasks, setTasks, columns, taskMap } = useTasks()
    const [sourceCol, setSourceCol] = useState<number | null>(null)

    return (
        <DragDropProvider
            onDragStart={(event) => {
                const sourceId = Number(event.operation.source?.id)
                const col = Number(Object.entries(tasks).find(([_, ids]) => {
                    return ids.includes(sourceId)
                })?.[0])
                setSourceCol(col ?? null)
            }}
            onDragEnd={(event) => {
                if (event.canceled) return
                const sourceId = Number(event.operation.source?.id)
                const targetId = event.operation.target?.id

                if (!targetId) return

                // find source column
                const sourceColumnId = Number(
                    Object.entries(tasks).find(([_, ids]) => ids.includes(sourceId))?.[0]
                )
                const targetColumnId = Number(targetId)

                if (sourceColumnId === targetColumnId) return

                setTasks(prev => {
                    const next = { ...prev }
                    next[sourceColumnId] = next[sourceColumnId].filter(id => id !== sourceId)
                    next[targetColumnId] = [...next[targetColumnId], sourceId]
                    return next
                })
            }}
        >
            <div className="flex gap-6 w-full h-full">
                {Object.entries(columns).map(([id, title]) => (
                    <KanbanColumn key={id} columnId={Number(id)} title={title} tasks={tasks[Number(id)]} />
                ))}
            </div>
        </DragDropProvider>
    )
}