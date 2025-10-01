'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react'
import type { Activity } from '@/types'

interface ActivitiesCardProps {
  activities: Activity[]
}

export function ActivitiesCard({ activities }: ActivitiesCardProps) {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'new':
        return <Circle className="h-4 w-4 text-blue-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusVariant = (status?: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'new':
        return 'default'
      case 'in-progress':
        return 'secondary'
      case 'completed':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Latest Activities</CardTitle>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            {activities.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No activities yet.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity, index) => (
                <div key={activity.id} className="flex gap-3">
                  {/* Timeline line */}
                  {index < activities.length - 1 && (
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="w-px h-8 bg-border mt-1"></div>
                    </div>
                  )}
                  {index === activities.length - 1 && (
                    <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      {getStatusIcon(activity.status)}
                    </div>
                  )}

                  {/* Activity content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-sm truncate">{activity.description}</h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {activity.status && (
                          <Badge variant={getStatusVariant(activity.status)} className="text-xs">
                            {activity.status === 'in-progress' ? 'In Progress' : activity.status}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activities.length > 5 && (
              <div className="pt-2 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View All Activity
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}