// User and authentication types

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  department?: string
  phone?: string
  createdAt: string
  lastLogin?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: NotificationSettings
  language: string
  timezone: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  leadUpdates: boolean
  dealReminders: boolean
}

export type UserRole = 'admin' | 'manager' | 'agent' | 'viewer'
