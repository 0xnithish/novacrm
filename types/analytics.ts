// Analytics and dashboard data types

export interface PerformanceData {
  date: string
  loanGenerated: number
  preapprovalLoan: number
  contacts: number
  inProcess: number
  loanClosed: number
}

export interface RevenueData {
  category: string
  value: number
  color: string
}

export interface KPIData {
  totalAmount: number
  totalDeals: number
  revenue: number
  leadsCount: number
}

export interface DashboardMetrics {
  totalLeads: number
  activeDeals: number
  closedDeals: number
  totalRevenue: number
  conversionRate: number
  averageDealValue: number
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}
