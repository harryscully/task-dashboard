"use client"
import KanbanColumn from "./KanbanColumn";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove } from "@dnd-kit/sortable";
import { useTasks } from "@/context/TaskContext";
import confetti from "canvas-confetti";
import { useState, useEffect } from "react";
import KanbanCard from "./KanbanCard";
import type { TaskModel } from "../../../generated/prisma/models/Task";
import { updateTaskColumn } from "@/actions/tasks";

export default function KanbanBoard() {
    const { tasks, setTasks, columns, taskMap, setTaskMap } = useTasks()
    const [activeTask, setActiveTask] = useState<TaskModel | null>(null)
    const [sourceCol, setSourceCol] = useState<string | null>(null)

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 5 }
    }))

    function findColumn(taskId: string) {
        return Object.entries(tasks).find(([_, ids]) => ids.includes(taskId))?.[0]
    }

    function onDragStart(event: DragStartEvent) {
        const id = event.active.id as string
        const task = taskMap[id]
        if (task) setActiveTask(task)
        setSourceCol(findColumn(id) ?? null)
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        const activeCol = findColumn(activeId)
        // over could be a column id or a task id
        const overCol = tasks[overId] ? overId : findColumn(overId)

        if (!activeCol || !overCol || activeCol === overCol) return

        setTasks(prev => ({
            ...prev,
            [activeCol]: prev[activeCol].filter(id => id !== activeId),
            [overCol]: [...prev[overCol], activeId]
        }))
        setTaskMap(prev => ({
            ...prev,
            [activeId]: { ...prev[activeId], columnId: overCol }
        }))
    }

    async function onDragEnd(event: DragEndEvent) {
        const { active, over } = event
        setActiveTask(null)
        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        const activeCol = findColumn(activeId)
        const overCol = tasks[overId] ? overId : findColumn(overId)

        if (!activeCol || !overCol) return

        // confetti if dropped into Done
        const doneColId = Object.entries(columns).find(([_, t]) => t === "Done")?.[0]

        if (overCol === doneColId && sourceCol !== doneColId) {
            confetti({ angle: 270, particleCount: 200, spread: 80, origin: { y: -0.3 } })
        }

        if (activeCol === overCol) {
            // reorder within same column
            setTasks(prev => {
                const oldIndex = prev[activeCol].indexOf(activeId)
                const newIndex = prev[activeCol].indexOf(overId)
                if (oldIndex === newIndex) return prev
                return { ...prev, [activeCol]: arrayMove(prev[activeCol], oldIndex, newIndex) }
            })
            setTaskMap(prev => ({
                ...prev,
                [activeId]: { ...prev[activeId], columnId: overCol }
            }))
        }

        if (activeCol !== overCol) {
            await updateTaskColumn(activeId, overCol)
        }
    }

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex gap-6 w-full h-full">
                {Object.entries(columns).map(([id, title]) => (
                    <KanbanColumn key={id} columnId={id} title={title} tasks={tasks[id]} />
                ))}
            </div>
            <DragOverlay>
                {activeTask ? <KanbanCard task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>
    )
}