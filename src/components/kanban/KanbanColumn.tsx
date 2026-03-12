"use client"
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area";
import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from '@dnd-kit/abstract';
import { useTasks } from "@/context/TaskContext";

type KanbanColumnProps = {
    columnId: string,
    title: string,
    tasks: string[]
}

export default function KanbanColumn({ columnId, title, tasks }: KanbanColumnProps) {
    const { ref } = useDroppable({
        id: `column-${columnId}`,
        type: 'column',
        accept: ['item'],
        collisionPriority: CollisionPriority.Low
    })

    const { taskMap } = useTasks()

    return (
        <Card ref={ref} className="flex-1 h-full min-w-50 flex flex-col">
            <CardHeader className="flex justify-between shrink-0">
                <CardTitle>{title}</CardTitle>
                <Badge variant="secondary">{tasks.length} tasks</Badge>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-4 p-px">
                        {tasks.map((taskId, index) => {
                            const task = taskMap[taskId]
                            if (!task) return null
                            return <KanbanCard key={taskId} task={task} />
                        }
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}