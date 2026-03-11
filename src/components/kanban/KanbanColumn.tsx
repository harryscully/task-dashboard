"use client"
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area";
import { Column, initialTasks } from "@/data/tasks"
import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from '@dnd-kit/abstract';

type KanbanColumnProps = {
    column: Column,
    tasks: string[]
}

export default function KanbanColumn({ column, tasks }: KanbanColumnProps) {
    const { ref } = useDroppable({
        id: column.id,
        type: 'column',
        accept: ['item'],
        collisionPriority: CollisionPriority.Low
    })

    return (
        <Card ref={ref} className="flex-1 h-full min-w-50 flex flex-col">
            <CardHeader className="flex justify-between shrink-0">
                <CardTitle>{column.title}</CardTitle>
                <Badge variant="secondary">{tasks.length} tasks</Badge>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-4 p-px">
                        {tasks.map((taskId, index) => {
                            const task = initialTasks.find(t => t.id === taskId)
                            if (!task) return null
                            return <KanbanCard key={taskId} task={task} index={index} column={column.id} />
                        }
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}