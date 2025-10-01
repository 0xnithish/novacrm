// Task management types

export interface Task {
  id: string
  title: string
  done: boolean
  description?: string
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
  assignedTo?: string
  createdAt?: string
  updatedAt?: string
}

export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'in-progress' | 'completed'
