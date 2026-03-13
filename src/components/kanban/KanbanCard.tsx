"use client"
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TaskModel } from "../../../generated/prisma/models/Task"
import { useTheme } from "next-themes";
const priorityVariantDark: Record<TaskModel["priority"], string> = {
    "HIGH": "bg-red-950 text-red-300",
    "MEDIUM": "bg-blue-950 text-blue-300",
    "LOW": "bg-green-950 text-green-300"
}

const priorityVariantLight: Record<TaskModel["priority"], string> = {
    "HIGH": "bg-red-300 text-red-950",
    "MEDIUM": "bg-blue-300 text-blue-950",
    "LOW": "bg-green-300 text-green-950"
}

export default function KanbanCard({ task }: { task: TaskModel }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: { type: 'task', task }
    })

    const { resolvedTheme } = useTheme()
    const priorityVariant = resolvedTheme === "dark" ? priorityVariantDark : priorityVariantLight

    return (
        <Card
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={`bg-accent shrink-0 cursor-grab ${isDragging ? 'opacity-50' : ''}`}
        >
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