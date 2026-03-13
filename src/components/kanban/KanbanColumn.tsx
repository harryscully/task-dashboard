"use client"
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Plus } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTasks } from "@/context/TaskContext";

type KanbanColumnProps = {
    columnId: string,
    title: string,
    tasks: string[]
}

export default function KanbanColumn({ columnId, title, tasks }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({ id: columnId })
    const { taskMap } = useTasks()

    return (
        <Card className="flex-1 h-full min-w-50 flex flex-col">
            <CardHeader className="flex justify-between shrink-0 items-center">
                <div className="flex gap-2 items-center">
                    <CardTitle>{title}</CardTitle>
                    <Badge variant="secondary">{tasks.length} tasks</Badge>
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Plus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add new task</p>
                    </TooltipContent>
                </Tooltip>

            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    <div ref={setNodeRef} className="flex flex-col gap-4 p-px min-h-16 h-full">
                        {tasks.map((taskId) => {
                            const task = taskMap[taskId]
                            if (!task) return null
                            return <KanbanCard key={taskId} task={task} />
                        })}
                    </div>
                </SortableContext>
            </CardContent>
        </Card>
    )
}