import { Card, CardContent } from "@/components/ui/card"

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    positive: boolean
  }
}

export function KPICard({ title, value, subtitle, trend }: KPICardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </h3>
            {subtitle && (
              <span className="text-sm text-muted-foreground">
                {subtitle}
              </span>
            )}
          </div>
          {trend && (
            <div className="mt-2">
              <span className={`text-sm ${
                trend.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.positive ? '+' : ''}{trend.value}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}