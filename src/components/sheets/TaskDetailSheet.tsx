import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetFooter, SheetTitle, SheetTrigger, SheetClose } from "../ui/sheet";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { TaskModel } from "../../../generated/prisma/models";
import { deleteTask } from "@/actions/tasks";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Trash2Icon } from "lucide-react"
import TaskForm from "../forms/TaskForm";

type TaskDetailSheet = {
    task: TaskModel
    children: React.ReactElement
}

export default function TaskDetailSheet({ task, children }: TaskDetailSheet) {
    const [open, setOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { columns, removeTask } = useTasks()
    const router = useRouter()

    async function onDelete() {
        await deleteTask(task.id)
        removeTask(task)
        router.refresh()
        setOpen(false)
    }

    const priorityLookup = {
        HIGH: "High",
        MEDIUM: "Medium",
        LOW: "Low"
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

                {!isEditing ? (<div className="px-4">
                    <p className="mb-2 text-xs text-muted-foreground uppercase font-semibold">Title</p>
                    <p>{task.title}</p>

                    {task.description && (
                        <>
                            <p className="mt-6 mb-2 text-xs text-muted-foreground uppercase font-semibold">Description</p>
                            <p>{task.description}</p>
                        </>
                    )}

                    <p className="mt-6 mb-2 text-xs text-muted-foreground uppercase font-semibold">Status</p>
                    <p>{columns[task.columnId]}</p>

                    <p className="mt-6 mb-2 text-xs text-muted-foreground uppercase font-semibold">Priority</p>
                    <p>{priorityLookup[task.priority]}</p>

                    {task.dueDate && (
                        <>
                            <p className="mt-6 mb-2 text-xs text-muted-foreground uppercase font-semibold">Due Date</p>
                            <p>
                                {task.dueDate.toLocaleDateString("en-uk", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </p>
                        </>
                    )}
                </div>) : <TaskForm columnId={task.columnId} task={task} onSuccess={()=>setIsEditing(false)} />}

                {!isEditing && <SheetFooter>
                    <Button onClick={() => setIsEditing(prev => !prev)}>
                        Edit Task
                    </Button>


                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                Delete Task
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                            <AlertDialogHeader>
                                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                    <Trash2Icon />
                                </AlertDialogMedia>
                                <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete this task.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                                <AlertDialogAction variant="destructive" onClick={() => onDelete()}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>



                    <SheetClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
                }
            </SheetContent>
        </Sheet>
    )
}