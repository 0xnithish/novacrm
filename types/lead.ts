// Core lead and deal management types

export interface Activity {
  id: string
  type: string  // More flexible - can be 'Call', 'Email', 'Meeting', 'Document', etc.
  description: string
  timestamp: string
  status?: 'new' | 'in-progress' | 'completed'
}

export interface Note {
  id: string
  title: string
  content: string
  timestamp: string
}

export interface Lead {
  id: string
  title: string
  clientName: string
  email: string
  phone: string
  amount: string
  leadOwner: string
  location: string
  referralPartner: string
  annualIncome: string
  progressPercentage: number
  activities: Activity[]
  notes: Note[]
  // Optional for closed deals
  closedDate?: string
}

export interface SimpleLead {
  id: string
  name: string
  contact: string
  email: string
  status: 'in progress' | 'closed' | 'new' | 'qualified'
  avatar?: string
}

export type LeadStatus = 'new' | 'qualified' | 'in progress' | 'closed'
export type ActivityType = 'Call' | 'Email' | 'Meeting' | 'Document' | 'Follow-up' | string
export type ActivityStatus = 'new' | 'in-progress' | 'completed'
