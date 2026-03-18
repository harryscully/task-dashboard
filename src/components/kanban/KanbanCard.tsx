"use client"
import TaskDetailSheet from "../sheets/TaskDetailSheet";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TaskModel } from "../../../generated/prisma/models/Task"
import { useTheme } from "next-themes";
import { FlagIcon } from "lucide-react";

const priorityLabel = {
    "HIGH": "High",
    "MEDIUM": "Medium",
    "LOW": "Low"
}

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
        <TaskDetailSheet task={task}>
            <Card
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={{ transform: CSS.Transform.toString(transform), transition }}
                className={`bg-accent shrink-0 cursor-pointer ${isDragging ? 'opacity-50' : ''}`}
            >
                <CardHeader>
                    <div className=" flex gap-2">
                        <Badge className={priorityVariant[task.priority]}>
                            {priorityLabel[task.priority]}
                        </Badge>

                        {task.dueDate && (
                            <Badge variant="outline">
                                <FlagIcon data-icon="inline-start" />
                                {task.dueDate.toLocaleDateString("en-uk", {
                                    month: "short",
                                    day: "numeric"
                                })}
                            </Badge>)}
                    </div>
                    <CardTitle className="mt-2">{task.title}</CardTitle>
                    {task.description && <CardDescription>{task.description}</CardDescription>}
                </CardHeader>

                <CardFooter>

                </CardFooter>
            </Card>
        </TaskDetailSheet>
    )
}