# tasks-dashboard ☑️

A application for managing tasks across a Kanban board with live analytics on Dashboard

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Drag & Drop | dnd-kit |
| Charts | Recharts |
| Styling | Tailwind CSS + shadcn/ui |

## Features

- Kanban board with drag and drop between columns
- Reorder tasks within columns
- Task count badges per column
- Dashboard with live charts that reflect board state

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Dashboard with analytics
│   └── tasks/
│       └── page.tsx        # Kanban board
├── components/
│   ├── kanban/             # KanbanBoard, KanbanColumn, KanbanCard
│   ├── charts/             # ChartPie, ChartBar
│   └── Navbar.tsx
├── context/
│   └── TaskContext.tsx     # Global task state
├── data/
│   └── tasks.ts            # Types, mock data, initial state
```
