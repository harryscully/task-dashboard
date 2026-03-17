import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetFooter, SheetTitle, SheetTrigger, SheetClose } from "../ui/sheet";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { TaskModel } from "../../../generated/prisma/models";
import { deleteTask } from "@/actions/tasks";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";

type TaskDetailSheet = {
    task: TaskModel
    children: React.ReactElement
}

export default function TaskDetailSheet({ task, children }: TaskDetailSheet) {
    const [open, setOpen] = useState(false)
    const { removeTask } = useTasks()
    const router = useRouter()
    
    async function onDelete() {
        await deleteTask(task.id)
        removeTask(task)
        router.refresh()
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Task Details</SheetTitle>
                    <SheetDescription>Details for {task.title}</SheetDescription>
                </SheetHeader>

                <SheetFooter>
                    <Button variant="destructive" onClick={() => onDelete()}>
                        Delete Task
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    )
}