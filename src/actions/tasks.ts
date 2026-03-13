"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TaskSchema } from "@/lib/schemas";

export async function updateTaskColumn(taskId:string, columnId:string) {
    await prisma.task.update({
        where: { id: taskId },
        data: { columnId }
    })
}

export async function createTask(data: TaskSchema) {
    const newTask = await prisma.task.create({
        data: {
            ...data,
            createdById: 4
        }
    })
    revalidatePath("/tasks")
    revalidatePath("/")
    return newTask
}

export async function updateTask(taskId:string, data: TaskSchema) {
    await prisma.task.update({
        where: { id: taskId },
        data: {
            ...data,
            createdById: 1
        }
    })
    revalidatePath("/tasks")
    revalidatePath("/")
}

export async function deleteTask(taskId:string) {
    await prisma.taskAssignee.deleteMany({
        where: { taskId }
    })
    await prisma.task.delete({
        where: { id: taskId }
    })
    revalidatePath("/tasks")
    revalidatePath("/")
}