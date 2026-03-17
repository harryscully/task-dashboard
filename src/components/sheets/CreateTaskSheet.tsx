import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import TaskForm from "../forms/TaskForm"
import React, { useState } from "react";

type CreateTaskSheetProps = {
    columnId: string
    columnTitle: string
    children: React.ReactElement
}

export default function CreateTaskSheet({ columnId, columnTitle, children }: CreateTaskSheetProps) {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                        {children}
                    </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add new task</p>
                </TooltipContent>
            </Tooltip>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Task</SheetTitle>
                    <SheetDescription>Add new task to {columnTitle} column</SheetDescription>
                </SheetHeader>

                <TaskForm columnId={columnId} onSuccess={() => setOpen(false)} />

            </SheetContent>
        </Sheet>
    )
}