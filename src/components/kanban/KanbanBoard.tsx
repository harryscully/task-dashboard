"use client"
import KanbanColumn from "./KanbanColumn";
import { DragDropProvider } from '@dnd-kit/react'
import { useTasks } from "@/context/TaskContext";
import confetti from "canvas-confetti";
import { useState } from "react";

export default function KanbanBoard() {
    const { tasks, setTasks, columns } = useTasks()
    const [sourceCol, setSourceCol] = useState<string | null>(null)

    return (
        <DragDropProvider
            onDragStart={(event) => {
                const sourceId = Number(event.operation.source?.id?.toString().replace('task-', ''))
                const col = Object.entries(tasks).find(([_, ids]) => ids.includes(sourceId))?.[0]
                setSourceCol(col ?? null)
            }}
            onDragEnd={(event) => {
                if (event.canceled) return
                const sourceId = Number(event.operation.source?.id?.toString().replace('task-', ''))
                const targetColId = event.operation.target?.id?.toString().replace('column-', '')
                if (!targetColId) return

                const doneColumnId = Object.entries(columns).find(([_, title]) => title === "Done")?.[0]
                if (targetColId === doneColumnId && sourceCol !== doneColumnId) {
                    confetti({
                        angle: 270,
                        particleCount: 200,
                        spread: 80,
                        origin: { y: -0.3 }
                    })
                }

                setTasks(prev => {
                    if (!sourceCol || sourceCol === targetColId) return prev
                    if (!prev[targetColId]) return prev  // guard against missing key
                    return {
                        ...prev,
                        [sourceCol]: prev[sourceCol].filter(id => id !== sourceId),
                        [targetColId]: [...prev[targetColId], sourceId]
                    }
                })
            }}
        >
            <div className="flex gap-6 w-full h-full">
                {Object.entries(columns).map(([id, title]) => (
                    <KanbanColumn key={id} columnId={Number(id)} title={title} tasks={tasks[id]} />
                ))}
            </div>
        </DragDropProvider>
    )
}