import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import React, { useState } from "react";
import { TaskModel } from "../../../generated/prisma/models";

type TaskDetailSheet = {
    task: TaskModel
    children: React.ReactElement
}

export default function TaskDetailSheet({ task, children }: TaskDetailSheet) {
    const [open, setOpen] = useState(false)

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

            </SheetContent>
        </Sheet>
    )
}