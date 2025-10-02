import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

type KPIValueFormat = "number" | "currency" | "compact"

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    positive: boolean
    label?: string
  }
  /**
   * Controls how numeric values are formatted when no valueFormatter is provided.
   * - `number`: uses a standard locale number with thousand separators.
   * - `currency`: formats using Intl currency with the provided currency code (defaults to USD).
   * - `compact`: renders in compact notation (e.g. 12.4K).
   */
  format?: KPIValueFormat
  /**
   * Currency code used when `format` is set to `currency`.
   */
  currency?: string
  /** Optional prefix appended before the formatted value. */
  valuePrefix?: string
  /** Optional suffix appended after the formatted value. */
  valueSuffix?: string
  /** Custom formatter that receives the raw value and returns a string. */
  valueFormatter?: (value: string | number) => string
  /** Additional class names for the outer wrapper. */
  className?: string
}

const formatNumberValue = (
  value: string | number,
  format: KPIValueFormat,
  currency?: string
) => {
  if (typeof value !== "number") {
    return value
  }

  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency ?? "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  if (format === "compact") {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value)
  }

  const hasDecimals = !Number.isInteger(value)
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0
  }).format(value)
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  format = "number",
  currency,
  valuePrefix,
  valueSuffix,
  valueFormatter,
  className
}: KPICardProps) {
  const formattedValue = valueFormatter
    ? valueFormatter(value)
    : formatNumberValue(value, format, currency)

  const mergedValue = `${valuePrefix ?? ""}${formattedValue}${valueSuffix ?? ""}`

  const trendDisplay = trend
    ? trend.value.match(/^[-+]/)
      ? trend.value
      : `${trend.positive ? "+" : "-"}${trend.value}`
    : null

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-[80px] flex-col justify-center overflow-hidden rounded-lg border border-border bg-card px-4 py-3 text-card-foreground shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          {subtitle ? (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {subtitle}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <span className="text-2xl font-bold text-card-foreground">
            {mergedValue}
          </span>

          {trend && trendDisplay ? (
            <div
              className={cn(  
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap self-start sm:self-auto",
                trend.positive
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                  : "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
              )}
            >
              {trend.positive ? (
                <TrendingUp className="h-3 w-3" aria-hidden />
              ) : (
                <TrendingDown className="h-3 w-3" aria-hidden />
              )}
              <span>{trendDisplay}</span>
              {trend.label ? (
                <span
                  className={cn(
                    "text-[10px] font-medium whitespace-nowrap opacity-80"
                  )}
                >
                  {trend.label}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}