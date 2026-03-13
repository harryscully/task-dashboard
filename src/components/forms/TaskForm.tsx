"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { taskSchema, type TaskSchema } from "@/lib/schemas"
import { createTask } from "@/actions/tasks"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { useTasks } from "@/context/TaskContext"

export default function TaskForm({ columnId, onSuccess }: { columnId: string, onSuccess: () => void }) {
    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            columnId: columnId
        }
    })
    const router = useRouter()

    const { columns, addTask } = useTasks()
    
    async function onSubmit(data: TaskSchema) {
        const newTask = await createTask(data)
        addTask(newTask)
        router.refresh()
        onSuccess()
    }

    return (
        <form
            className="px-4 h-full flex flex-col justify-between"
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
            </FieldGroup>
            <Field>
                <Button type="submit">
                    Submit
                </Button>
            </Field>
        </form>
    )
}