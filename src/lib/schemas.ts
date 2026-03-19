import * as z from "zod"

export const taskSchema = z.object({
    title: z.string().min(1,"Title is required"),
    description: z.optional(z.string()),
    priority: z.enum(["HIGH","MEDIUM","LOW"]),
    dueDate: z.optional(z.date()),
    columnId: z.string(),
    assignees: z.array(z.number()).optional()
})

export type TaskSchema = z.infer<typeof taskSchema>