import { prisma } from "@/lib/prisma";

async function main() {
    await prisma.taskAssignee.deleteMany()
    await prisma.task.deleteMany()
    await prisma.column.deleteMany()
    await prisma.user.deleteMany()

    // USERS
    const phineas = await prisma.user.upsert({
        where: { email: "phineas@mail.com" },
        update: {},
        create: {
            firstName: "Phineas",
            lastName: "Flynn",
            email: "phineas@mail.com"
        }
    })
    const ferb = await prisma.user.upsert({
        where: { email: "ferb@mail.com" },
        update: {},
        create: {
            firstName: "Ferb",
            lastName: "Fletcher",
            email: "ferb@mail.com"
        }
    })
    const heinz = await prisma.user.upsert({
        where: { email: "heinz@mail.com" },
        update: {},
        create: {
            firstName: "Heinz",
            lastName: "Doofenshmirtz",
            email: "heinz@mail.com"
        }
    })

    // COLUMNS
    const toDo = await prisma.column.upsert({
        where: { order: 1 },
        update: {},
        create: {
            title: "To Do",
            order: 1
        }
    })
    const inProg = await prisma.column.upsert({
        where: { order: 2 },
        update: {},
        create: {
            title: "In Progress",
            order: 2
        }
    })
    const review = await prisma.column.upsert({
        where: { order: 3 },
        update: {},
        create: {
            title: "Review",
            order: 3
        }
    })
    const done = await prisma.column.upsert({
        where: { order: 4 },
        update: {},
        create: {
            title: "Done",
            order: 4
        }
    })

    // TASKS
    const rocket = await prisma.task.create({
        data: {
            title: "Build a rocket",
            priority: "HIGH",
            columnId: toDo.id,
            createdById: phineas.id
        }
    })
    const mummy = await prisma.task.create({
        data: {
            title: "Fight a mummy",
            priority: "LOW",
            columnId: toDo.id,
            createdById: ferb.id
        }
    })
    const triState = await prisma.task.create({
        data: {
            title: "Destroy the tri-state area",
            priority: "HIGH",
            columnId: inProg.id,
            createdById: heinz.id
        }
    })

    // TASK ASSIGNEES
    await prisma.taskAssignee.create({
        data: {
            taskId: rocket.id,
            userId: ferb.id
        }
    })

    await prisma.taskAssignee.create({
        data: {
            taskId: triState.id,
            userId: heinz.id
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });