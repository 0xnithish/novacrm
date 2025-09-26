"use client"

import { useState } from "react"
import { KPICard } from "@/components/dashboard/kpi-card"
import { PerformanceAreaChart } from "@/components/charts/performance-area-chart"
import { LeadsTable } from "@/components/dashboard/leads-table"
import { RevenueCard } from "@/components/dashboard/revenue-card"
import {
  mockLeads,
  mockPerformanceData,
  mockRevenueData,
  mockKPIData
} from "@/lib/data/mock-data"

export default function Home() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')

  return (
    <div className="space-y-6">
      {/* Performance Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Performance This Month</h2>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <KPICard
            title="Total Amount"
            value={mockKPIData.totalAmount}
            subtitle="USD"
            trend={{ value: "+12.5%", positive: true }}
          />
          <KPICard
            title="Total Deals"
            value={mockKPIData.totalDeals}
            trend={{ value: "+8", positive: true }}
          />
        </div>

        {/* Performance Chart */}
        <PerformanceAreaChart
          data={mockPerformanceData}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <LeadsTable
          leads={mockLeads}
          leadsCount={mockKPIData.leadsCount}
        />

        {/* Revenue */}
        <RevenueCard
          revenueData={mockRevenueData}
          totalRevenue={mockKPIData.revenue}
        />
      </div>
    </div>
  )
}