"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { taskSchema, type TaskSchema } from "@/lib/schemas"
import { createTask, updateTask } from "@/actions/tasks"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "../ui/combobox"
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { useTasks } from "@/context/TaskContext"
import { TaskModel } from "../../../generated/prisma/models"
import { useState } from "react"

export default function TaskForm({ columnId, task, onSuccess }: { columnId: string, task?: TaskModel, onSuccess: () => void }) {
    const { columns, addTask, editTask, userMap, taskAssignees } = useTasks()
    
    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: task ? {
            title: task.title,
            description: task.description ?? "",
            columnId: task.columnId,
            priority: task.priority,
            dueDate: task.dueDate ?? undefined,
            assignees: taskAssignees[task.id] ?? []
        } : {
            title: "",
            description: "",
            columnId: columnId,
            assignees: []
        }
    })
    const router = useRouter()


    async function onSubmit(data: TaskSchema) {
        if (task) {
            const newTask = await updateTask(task.id, data)
            editTask(newTask)
        } else {
            const newTask = await createTask(data)
            addTask(newTask)
        }

        router.refresh()
        onSuccess()
    }

    const users = Object.values(userMap)
    const anchor = useComboboxAnchor()

    return (
        <form
            className="px-4 pb-4 h-full flex flex-col justify-between"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <FieldGroup>
                {/* TITLE */}
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="gap-1">
                                Title
                                <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Watch Phineas & Ferb"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />)}
                        </Field>
                    )}
                />

                {/* DESCRIPTION */}
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="flex justify-between">
                                Description
                                <span className="text-muted-foreground text-xs">Optional field</span>
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="At least 3 episodes"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />)}
                        </Field>
                    )}
                />

                {/* COLUMN */}
                <Controller
                    name="columnId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="gap-1">
                                Status
                                <span className="text-destructive">*</span>
                            </FieldLabel>

                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-30"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectGroup>
                                        {Object.entries(columns).map(([id, title]) => (
                                            <SelectItem key={id} value={id}>{title}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />)}
                        </Field>
                    )}
                />

                {/* PRIORITY */}
                <Controller
                    name="priority"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="gap-1">
                                Priority
                                <span className="text-destructive">*</span>
                            </FieldLabel>

                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-30"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectGroup>
                                        <SelectItem value="HIGH">High</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="LOW">Low</SelectItem>
                                    </SelectGroup>

                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />)}
                        </Field>
                    )}
                />

                {/* DUE DATE */}
                <Controller
                    name="dueDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="flex justify-between">
                                Due Date
                                <span className="text-muted-foreground text-xs">Optional field</span>
                            </FieldLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!field.value}
                                        className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                    >
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        defaultMonth={field.value}
                                    />
                                </PopoverContent>
                            </Popover>

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />)}
                        </Field>
                    )}
                />

                {/* ASSIGNED */}
                <Controller
                    name="assignees"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="gap-1">
                                Assigned User(s)
                            </FieldLabel>

                            <Combobox
                                items={users}
                                multiple
                                value={users.filter(user => field.value?.includes(user.id))}
                                onValueChange={(selected) => field.onChange(selected.map(u => u.id))}
                                itemToStringValue={(user) => `${user.firstName} ${user.lastName}`}
                            >
                                <ComboboxChips ref={anchor} className="w-full">
                                    <ComboboxValue>
                                        {field.value?.map((id) => (
                                            <ComboboxChip key={id}>{userMap[id]?.firstName}</ComboboxChip>
                                        ))}
                                    </ComboboxValue>
                                    <ComboboxChipsInput placeholder={field.value?.length ? "" : "Select user(s)"} />
                                </ComboboxChips>
                                <ComboboxContent anchor={anchor}>
                                    <ComboboxEmpty>No users found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(user) => (
                                            <ComboboxItem key={user.id} value={user}>
                                                {user.firstName} {user.lastName}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />)}
                        </Field>
                    )}
                />
            </FieldGroup>
            <Field>
                <Button type="submit">
                    {task ? "Edit" : "Submit"}
                </Button>
                <Button type="button" variant="outline" onClick={onSuccess}>
                    {task ? "Cancel" : "Close"}
                </Button>
            </Field>
        </form>
    )
}