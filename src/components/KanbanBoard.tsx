import KanbanColumn from "./KanbanColumn";
import { columns, tasks } from "@/data/tasks"

export default function KanbanBoard() {
    return (
        <div className="flex gap-4 w-full">
            {columns.map((column) => (
                <KanbanColumn key={column.id} column={column} tasks={tasks.filter((task) => task.columnId === column.id)}/>
            ))}
        </div>
    )
}