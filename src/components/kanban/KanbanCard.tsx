"use client"
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { useSortable } from "@dnd-kit/react/sortable";
import type { TaskModel } from "../../../generated/prisma/models/Task"

const priorityVariant: Record<TaskModel["priority"], string> = {
    "HIGH": "bg-red-950 text-red-300",
    "MEDIUM": "bg-blue-950 text-blue-300",
    "LOW": "bg-green-950 text-green-300"
}

export default function KanbanCard({ task, column, index}: { task: TaskModel, column: number, index:number }) {
    const { ref } = useSortable({
        id: `task-${task.id}`,
        group: column.toString(),
        index,
        type: 'item',
    })

    return (
        <Card ref={ref} className="bg-accent cursor-grab">
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Badge className={`uppercase ${priorityVariant[task.priority]}`}>
                    {task.priority}
                </Badge>
            </CardContent>
        </Card>
    )
}