"use client"

import { useState } from "react"
import { KPICard } from "@/components/dashboard/kpi-card"
import { PerformanceAreaChart } from "@/components/dashboard/performance-area-chart"
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
        <h2 className="text-xl font-bold mb-6">Performance This Month</h2>

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