export type ColumnId = "to-do" | "in-progress" | "review" | "done"

export type Task = {
    id: string
    title: string
    priority: "low" | "medium" | "high"
    columnId: ColumnId
}

export type Column = {
    id: ColumnId
    title: string
}

export const columns:Column[] = [
    {id: "to-do", title: "To Do"}, 
    {id: "in-progress", title: "In Progress"},
    {id: "review", title: "Review"},
    {id: "done", title: "Done"}
]

export const tasks: Task[] = [
  { id: "task-1", title: "Teach the dog to open the fridge", priority: "high", columnId: "done" },
  { id: "task-2", title: "Apologise to the houseplant", priority: "low", columnId: "done" },
  { id: "task-3", title: "Investigate suspicious biscuit disappearance", priority: "high", columnId: "in-progress" },
  { id: "task-4", title: "Write strongly worded letter to the weather", priority: "medium", columnId: "in-progress" },
  { id: "task-5", title: "Negotiate bedtime with a toddler", priority: "high", columnId: "review" },
  { id: "task-6", title: "Determine if the sofa has eaten the remote", priority: "low", columnId: "review" },
  { id: "task-7", title: "Attend mandatory fun team building event", priority: "medium", columnId: "to-do" },
  { id: "task-8", title: "Finally read the terms and conditions", priority: "low", columnId: "to-do" },
  { id: "task-9", title: "Overthink a minor social interaction from 2014", priority: "medium", columnId: "to-do" },
]