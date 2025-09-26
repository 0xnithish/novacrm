"use client"

import { useState } from "react"
import { PerformanceAreaChart } from "@/components/dashboard/PerformanceAreaChart"
import { LeadsTable } from "@/components/dashboard/LeadsTable"
import { RevenueCard } from "@/components/dashboard/RevenueCard"
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

        {/* Performance Chart */}
        <PerformanceAreaChart
          data={mockPerformanceData}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </div>

      {/* Bottom Section */}
  <div className="grid gap-6 lg:grid-cols-[minmax(0,_1.7fr)_minmax(0,_1fr)]">
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