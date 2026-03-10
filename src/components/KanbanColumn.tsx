"use client"
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area";
import type { Column, Task } from "@/data/tasks"
import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/react";

type KanbanColumnProps = {
    column: Column,
    tasks: Task[]
}

export default function KanbanColumn({ column, tasks }: KanbanColumnProps) {
    const {ref} = useDroppable({
        id: column.id
    })

    return (
        <Card ref={ref} className="flex-1 h-full">
            <CardHeader className="flex justify-between">
                <CardTitle>{column.title}</CardTitle>
                <Badge variant="secondary">{tasks.length} tasks</Badge>
            </CardHeader>
            <CardContent>
                <ScrollArea>
                    <div className="flex flex-col gap-4">
                        {tasks.map((task, index) => (
                            <KanbanCard key={task.id} task={task} />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}