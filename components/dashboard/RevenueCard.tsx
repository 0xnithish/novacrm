import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RevenueData } from "@/lib/data/mock-data"
import { ArrowRight } from "lucide-react"

interface RevenueCardProps {
  revenueData: RevenueData[]
  totalRevenue: number
}

export function RevenueCard({ revenueData, totalRevenue }: RevenueCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const totalValue = revenueData.reduce((sum, item) => sum + item.value, 0)

  return (
  <Card className="gap-3">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Revenue</CardTitle>
          <Button variant="ghost" size="sm" className="text-sm">
            See all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
  <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
              {revenueData.map((item) => {
                const percentage = totalValue === 0 ? 0 : (item.value / totalValue) * 100
                return (
                  <div
                    key={item.category}
                    className="h-full"
                    style={{
                      width: `${percentage}%`,
                      flexBasis: `${percentage}%`,
                      flexGrow: percentage,
                      backgroundColor: item.color,
                    }}
                  />
                )
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Revenue split</span>
              <span>{formatCurrency(totalValue)}</span>
            </div>
          </div>

          <div className="space-y-2">
            {revenueData.map((item) => (
              <div key={item.category} className="flex items-center justify-between rounded-lg border border-transparent px-2 py-1.5 transition-colors hover:border-border">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-sm font-medium">{item.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {totalValue === 0
                        ? '0% of total'
                        : `${Math.round((item.value / totalValue) * 100)}% of total`}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}