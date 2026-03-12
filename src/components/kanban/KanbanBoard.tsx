"use client"
import KanbanColumn from "./KanbanColumn";
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
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
            onDragOver={(event) => {
                setTasks((tasks) => move(tasks, event));
            }}
            onDragEnd={(event) => {
                if (event.canceled) return
                const targetId = event.operation.target?.id as string
                const doneColumnId = Object.entries(columns).find(([_, title]) => title === "Done")?.[0]
                const isTargetDone = doneColumnId ? tasks[Number(doneColumnId)].includes(Number(targetId)) : false
                if (isTargetDone && sourceCol !== Number(doneColumnId)) {
                    confetti({
                        angle: 270,
                        particleCount: 200,
                        spread: 80,
                        origin: { y: -0.3 }
                    })
                }

                setTasks((tasks) => move(tasks, event))
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