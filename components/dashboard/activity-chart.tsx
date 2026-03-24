"use client"

import { useStaggerReveal } from "@/hooks/use-animate-on-scroll"
import { dashboardActivity } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

export function ActivityChart() {
  const { ref, isVisible } = useStaggerReveal({ threshold: 0.15 })

  return (
    <Card
      ref={ref}
      className={cn(
        "reveal border bg-card transition-all hover:shadow-md",
        isVisible && "is-visible"
      )}
    >
      <CardHeader>
        <CardTitle className="text-base">Weekly Learning Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboardActivity}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.48 0.2 265)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.48 0.2 265)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="week"
                className="text-xs"
                tick={{ fill: "oklch(0.50 0.02 260)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "oklch(0.50 0.02 260)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.17 0.02 260)",
                  border: "1px solid oklch(0.27 0.025 260)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0.01 260)",
                  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.4)",
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="oklch(0.48 0.2 265)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorHours)"
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
