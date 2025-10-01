import type { SimpleLead, PerformanceData, RevenueData, KPIData } from '@/types'

export const mockLeads: SimpleLead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    contact: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    status: 'in progress',
    avatar: '/placeholder-avatar-1.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    contact: '+1 (555) 234-5678',
    email: 'michael.chen@email.com',
    status: 'closed',
    avatar: '/placeholder-avatar-2.jpg'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    contact: '+1 (555) 345-6789',
    email: 'emily.rodriguez@email.com',
    status: 'in progress',
    avatar: '/placeholder-avatar-3.jpg'
  },
  {
    id: '4',
    name: 'David Kim',
    contact: '+1 (555) 456-7890',
    email: 'david.kim@email.com',
    status: 'new',
    avatar: '/placeholder-avatar-4.jpg'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    contact: '+1 (555) 567-8901',
    email: 'lisa.thompson@email.com',
    status: 'qualified',
    avatar: '/placeholder-avatar-5.jpg'
  },
  {
    id: '6',
    name: 'James Wilson',
    contact: '+1 (555) 678-9012',
    email: 'james.wilson@email.com',
    status: 'in progress',
    avatar: '/placeholder-avatar-6.jpg'
  },
  {
    id: '7',
    name: 'Anna Martinez',
    contact: '+1 (555) 789-0123',
    email: 'anna.martinez@email.com',
    status: 'closed',
    avatar: '/placeholder-avatar-7.jpg'
  },
  {
    id: '8',
    name: 'Robert Taylor',
    contact: '+1 (555) 890-1234',
    email: 'robert.taylor@email.com',
    status: 'qualified',
    avatar: '/placeholder-avatar-8.jpg'
  },
  {
    id: '9',
    name: 'Jennifer Davis',
    contact: '+1 (555) 901-2345',
    email: 'jennifer.davis@email.com',
    status: 'new',
    avatar: '/placeholder-avatar-9.jpg'
  },
  {
    id: '10',
    name: 'Christopher Lee',
    contact: '+1 (555) 012-3456',
    email: 'christopher.lee@email.com',
    status: 'in progress',
    avatar: '/placeholder-avatar-10.jpg'
  },
  {
    id: '11',
    name: 'Michelle Brown',
    contact: '+1 (555) 123-4567',
    email: 'michelle.brown@email.com',
    status: 'closed',
    avatar: '/placeholder-avatar-11.jpg'
  },
  {
    id: '12',
    name: 'Kevin Anderson',
    contact: '+1 (555) 234-5678',
    email: 'kevin.anderson@email.com',
    status: 'qualified',
    avatar: '/placeholder-avatar-12.jpg'
  }
]

export const mockPerformanceData: PerformanceData[] = [
  { date: 'Sep 1', loanGenerated: 15000, preapprovalLoan: 8500, contacts: 120, inProcess: 45, loanClosed: 25 },
  { date: 'Sep 2', loanGenerated: 18000, preapprovalLoan: 9200, contacts: 135, inProcess: 52, loanClosed: 28 },
  { date: 'Sep 3', loanGenerated: 22000, preapprovalLoan: 11000, contacts: 148, inProcess: 58, loanClosed: 32 },
  { date: 'Sep 4', loanGenerated: 19500, preapprovalLoan: 9800, contacts: 142, inProcess: 55, loanClosed: 30 },
  { date: 'Sep 5', loanGenerated: 25000, preapprovalLoan: 12500, contacts: 165, inProcess: 65, loanClosed: 35 },
  { date: 'Sep 6', loanGenerated: 28000, preapprovalLoan: 14000, contacts: 178, inProcess: 72, loanClosed: 38 },
  { date: 'Sep 7', loanGenerated: 24000, preapprovalLoan: 12000, contacts: 160, inProcess: 68, loanClosed: 36 },
  { date: 'Sep 8', loanGenerated: 30000, preapprovalLoan: 15000, contacts: 185, inProcess: 78, loanClosed: 42 },
  { date: 'Sep 9', loanGenerated: 32000, preapprovalLoan: 16000, contacts: 192, inProcess: 82, loanClosed: 45 },
  { date: 'Sep 10', loanGenerated: 35000, preapprovalLoan: 17500, contacts: 205, inProcess: 88, loanClosed: 48 },
  { date: 'Sep 11', loanGenerated: 33000, preapprovalLoan: 16500, contacts: 198, inProcess: 85, loanClosed: 46 },
  { date: 'Sep 12', loanGenerated: 38000, preapprovalLoan: 19000, contacts: 215, inProcess: 92, loanClosed: 50 },
  { date: 'Sep 13', loanGenerated: 36000, preapprovalLoan: 18000, contacts: 208, inProcess: 90, loanClosed: 49 },
  { date: 'Sep 14', loanGenerated: 40000, preapprovalLoan: 20000, contacts: 225, inProcess: 95, loanClosed: 52 },
  { date: 'Sep 15', loanGenerated: 42000, preapprovalLoan: 21000, contacts: 232, inProcess: 98, loanClosed: 54 }
]

export const mockRevenueData: RevenueData[] = [
  { category: 'Deals Won', value: 89500, color: '#10b981' },
  { category: 'Deals Lost', value: 34400, color: '#ef4444' }
]

export const mockKPIData: KPIData = {
  totalAmount: 225001.10,
  totalDeals: 102,
  revenue: 123940,
  leadsCount: 12
}