"use server"
import { prisma } from "@/lib/prisma";

export async function updateTaskColumn(taskId:string, columnId:string) {
    await prisma.task.update({
        where: { id: taskId },
        data: { columnId }
    })
}