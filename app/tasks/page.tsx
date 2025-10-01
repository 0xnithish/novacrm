'use client'

import { useState } from "react"
import type { Task } from '@/types'

const starterTasks: Task[] = [
  { id: "1", title: "Follow up with new leads", done: false },
  { id: "2", title: "Prepare demo slides", done: true },
]

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11)

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(starterTasks)
  const [draft, setDraft] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = draft.trim()
    if (!trimmed) {
      return
    }

    const newTask: Task = {
      id: createId(),
      title: trimmed,
      done: false,
    }

    setTasks((previous) => [...previous, newTask])
    setDraft("")
  }

  const toggleTask = (taskId: string) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((previous) => previous.filter((task) => task.id !== taskId))
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold">Team todo list</h1>
        <p className="text-sm text-muted-foreground">
          Keep track of quick follow-ups and reminders for your day.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a new task"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          Add
        </button>
      </form>

      <section className="space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-md border border-dashed border-border bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground">
            No tasks yet. Add something to get started.
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-sm shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    readOnly
                    className="cursor-pointer size-4 rounded border-border"
                  />
                  <span className={task.done ? "text-muted-foreground line-through" : "text-foreground"}>
                    {task.title}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="cursor-pointer text-xs text-muted-foreground transition hover:text-destructive"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="flex items-center justify-between rounded-md border border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
        <span>{tasks.filter((task) => task.done).length} completed</span>
        <span>{tasks.filter((task) => !task.done).length} remaining</span>
      </footer>
    </div>
  )
}