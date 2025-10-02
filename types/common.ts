// Common utility types and shared interfaces

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FilterParams {
  search?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  assignedTo?: string
  [key: string]: string | undefined
}

export type SortOrder = 'asc' | 'desc'
export type Theme = 'light' | 'dark' | 'system'
