import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area";
import type { Column, Task } from "@/data/tasks"
import KanbanCard from "./KanbanCard";

type KanbanColumnProps = {
    column: Column,
    tasks: Task[]
}

export default function KanbanColumn({column, tasks}: KanbanColumnProps) {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <CardTitle>{column.title}</CardTitle>
                <Badge variant="secondary">{tasks.length} tasks</Badge>
            </CardHeader>
            <CardContent>
                <ScrollArea>
                    {tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} />
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}