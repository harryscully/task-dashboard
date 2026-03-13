"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { taskSchema } from "@/lib/schemas"
import type { TaskSchema } from "@/lib/schemas"
import { createTask } from "@/actions/tasks"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function TaskForm({columnId}:{columnId:string}) {
    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            columnId: columnId
        }
    })

    function onSubmit(data: TaskSchema) {
        createTask(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Title</FieldLabel>
                            <Input 
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Watch Phineas & Ferb"
                                autoComplete="off"
                            />
                            <FieldDescription>
                                Provide a concise title for the task
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError 
                                    errors={[fieldState.error]}
                                />)}
                        </Field>
                    )}
                />
            </FieldGroup>

        </form>
    )
}