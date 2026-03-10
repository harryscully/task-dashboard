"use client"
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import type { Task } from "@/data/tasks";
import { useDraggable } from "@dnd-kit/react";

const priorityVariant: Record<Task["priority"], string> = {
    "high": "bg-red-950 text-red-300",
    "medium": "bg-blue-950 text-blue-300",
    "low": "bg-green-950 text-green-300"
}


export default function KanbanCard({ task }: { task: Task }) {
    const { ref } = useDraggable({
        id: task.id,
    })

    return (
        <Card ref={ref} className="bg-accent">
            <CardHeader>
                <CardTitle>
                    {task.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Badge className={`uppercase ${priorityVariant[task.priority]}`}>{task.priority}</Badge>
            </CardContent>
        </Card>
    )
}