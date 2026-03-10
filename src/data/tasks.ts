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

export const initialTasks: Task[] = [
  { id: "task-1", title: "Build a rocket", priority: "high", columnId: "to-do" },
  { id: "task-2", title: "Fight a mummy", priority: "low", columnId: "to-do" },
  { id: "task-3", title: "Climb up the Eiffel Tower", priority: "high", columnId: "in-progress" },
  { id: "task-4", title: "Discover something that doesn't exist", priority: "medium", columnId: "in-progress" },
  { id: "task-5", title: "Give a monkey a shower", priority: "high", columnId: "in-progress" },
  { id: "task-6", title: "Surf tidal waves", priority: "low", columnId: "in-progress" },
  { id: "task-7", title: "Create nanobots", priority: "medium", columnId: "in-progress" },
  { id: "task-8", title: "Locate Frankenstein's brain", priority: "low", columnId: "review" },
  { id: "task-9", title: "Find a dodo bird", priority: "medium", columnId: "review" },
  { id: "task-10", title: "Paint a continent", priority: "medium", columnId: "review" },
  { id: "task-11", title: "Drive your sister insane", priority: "medium", columnId: "done" },
]

export const initialTasksRestructured: Record<ColumnId, string[]> = {
    "to-do": [],
    "in-progress": [],
    "review": [],
    "done": []
}

for (const task of initialTasks) {
    initialTasksRestructured[task.columnId].push(task.id)
}
