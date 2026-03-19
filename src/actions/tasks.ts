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
    const { assignees, ...taskData} = data
    const newTask = await prisma.task.create({
        data: {
            ...taskData,
            createdById: 4
        }
    })

    for (const user of assignees ?? []) {
        await prisma.taskAssignee.create({
            data: {
                taskId: newTask.id,
                userId: Number(user)
            }
        })
    }

    revalidatePath("/tasks")
    revalidatePath("/")
    return newTask
}

export async function updateTask(taskId:string, data: TaskSchema) {
    const { assignees, ...taskData} = data
    
    await prisma.taskAssignee.deleteMany({
        where: { taskId: taskId}
    })
    
    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
            ...taskData
        }
    })

    for (const user of assignees ?? []) {
        await prisma.taskAssignee.create({
            data: {
                taskId: taskId,
                userId: Number(user)
            }
        })
    }

    revalidatePath("/tasks")
    revalidatePath("/")
    return updatedTask
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