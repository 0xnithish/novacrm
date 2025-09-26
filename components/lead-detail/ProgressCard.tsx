'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ProgressCardProps {
  progressPercentage: number
}

export function ProgressCard({ progressPercentage }: ProgressCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Completion</span>
            <span className="text-sm font-bold text-[#0a8126]">
              {progressPercentage}%
            </span>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Started</span>
            <span>In Progress</span>
            <span>Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}