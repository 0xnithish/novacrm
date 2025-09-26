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
        "group relative flex h-full min-h-[120px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-card px-6 pt-5 text-card-foreground shadow-[0_18px_45px_-20px_rgba(15,23,42,0.18)] transition-shadow dark:shadow-[0_18px_45px_-18px_rgba(15,23,42,0.45)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[60%] top-[-35%] rounded-full transition-opacity duration-300 group-hover:opacity-80"
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {subtitle ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {subtitle}
            </span>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="text-3xl font-semibold text-card-foreground">
            {mergedValue}
          </span>

          {trend && trendDisplay ? (
            <div
              className={cn(  
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
                trend.positive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              )}
            >
              {trend.positive ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden />
              )}
              <span>{trendDisplay}</span>
              {trend.label ? (
                <span
                  className={cn(
                    "text-[10px] font-medium whitespace-nowrap",
                    trend.positive ? "text-emerald-700" : "text-rose-700"
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