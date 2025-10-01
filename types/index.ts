// Main types export file - Re-export all types from individual modules

// Lead and activity types
export type {
  Activity,
  Note,
  Lead,
  SimpleLead,
  LeadStatus,
  ActivityType,
  ActivityStatus
} from './lead'

// Task management types
export type {
  Task,
  TaskPriority,
  TaskStatus
} from './task'

// Analytics and dashboard types
export type {
  PerformanceData,
  RevenueData,
  KPIData,
  DashboardMetrics,
  ChartDataPoint
} from './analytics'

// User and authentication types
export type {
  User,
  UserProfile,
  UserPreferences,
  NotificationSettings,
  UserRole
} from './user'

// Common utility types
export type {
  BaseEntity,
  PaginationParams,
  PaginatedResponse,
  ApiResponse,
  SelectOption,
  FilterParams,
  SortOrder,
  Theme
} from './common'
