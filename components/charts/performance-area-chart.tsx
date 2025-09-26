"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { PerformanceData } from "@/lib/data/mock-data"

interface PerformanceAreaChartProps {
  data: PerformanceData[]
  chartType: 'line' | 'bar'
  onChartTypeChange: (type: 'line' | 'bar') => void
}

const chartColors = {
  loanGenerated: { area: '#8b5cf6', stroke: '#7c3aed' },
  preapprovalLoan: { area: '#3b82f6', stroke: '#2563eb' },
  contacts: { area: '#10b981', stroke: '#059669' },
  inProcess: { area: '#f59e0b', stroke: '#d97706' },
  loanClosed: { area: '#ef4444', stroke: '#dc2626' }
}

export function PerformanceAreaChart({ data, chartType, onChartTypeChange }: PerformanceAreaChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">
                {entry.dataKey === 'loanGenerated' && 'Loan Generated'}
                {entry.dataKey === 'preapprovalLoan' && 'Pre-approval Loan'}
                {entry.dataKey === 'contacts' && 'Contacts'}
                {entry.dataKey === 'inProcess' && 'In Process'}
                {entry.dataKey === 'loanClosed' && 'Loan Closed'}
              </span>
              <span className="font-medium ml-auto">
                {entry.dataKey === 'contacts' || entry.dataKey === 'inProcess' || entry.dataKey === 'loanClosed'
                  ? formatNumber(entry.value)
                  : formatCurrency(entry.value)
                }
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Performance This Month</CardTitle>
          <div className="flex items-center gap-2">
            <Toggle
              pressed={chartType === 'line'}
              onPressedChange={() => onChartTypeChange('line')}
              aria-label="Toggle line chart"
              size="sm"
            >
              Line
            </Toggle>
            <Toggle
              pressed={chartType === 'bar'}
              onPressedChange={() => onChartTypeChange('bar')}
              aria-label="Toggle bar chart"
              size="sm"
            >
              Bar
            </Toggle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 pt-0">
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
              <span>Loan Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
              <span>Pre-approval Loan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span>Contacts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <span>In Process</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span>Loan Closed</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="loanGenerated"
                    stackId="1"
                    stroke={chartColors.loanGenerated.stroke}
                    fill={chartColors.loanGenerated.area}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="preapprovalLoan"
                    stackId="1"
                    stroke={chartColors.preapprovalLoan.stroke}
                    fill={chartColors.preapprovalLoan.area}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="contacts"
                    stackId="2"
                    stroke={chartColors.contacts.stroke}
                    fill={chartColors.contacts.area}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="inProcess"
                    stackId="2"
                    stroke={chartColors.inProcess.stroke}
                    fill={chartColors.inProcess.area}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="loanClosed"
                    stackId="2"
                    stroke={chartColors.loanClosed.stroke}
                    fill={chartColors.loanClosed.area}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              ) : (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="loanGenerated" fill={chartColors.loanGenerated.area} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="preapprovalLoan" fill={chartColors.preapprovalLoan.area} radius={[2, 2, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}