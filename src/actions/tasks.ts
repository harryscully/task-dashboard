"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Priority } from "../../generated/prisma/enums";

export type TaskFormData = {
    title: string
    description?: string
    priority: "HIGH" | "MEDIUM" | "LOW"
    columnId: string
    createdById: number
    dueDate?: Date
}

export async function updateTaskColumn(taskId:string, columnId:string) {
    await prisma.task.update({
        where: { id: taskId },
        data: { columnId }
    })
}

export async function createTask(data: TaskFormData) {
    await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            columnId: data.columnId,
            createdById: data.createdById,
            dueDate: data.dueDate
        }
    })
    revalidatePath("/tasks")
    revalidatePath("/")
}

export async function updateTask(taskId:string, data: TaskFormData) {
    await prisma.task.update({
        where: { id: taskId },
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            columnId: data.columnId,
            createdById: data.createdById,
            dueDate: data.dueDate
        }
    })
    revalidatePath("/tasks")
    revalidatePath("/")
}

export async function deleteTask(taskId:string) {
    await prisma.task.delete({
        where: { id: taskId }
    })
    await prisma.taskAssignee.deleteMany({
        where: { taskId }
    })
    revalidatePath("/tasks")
    revalidatePath("/")
}