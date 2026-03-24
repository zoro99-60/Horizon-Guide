"use client"

import { useEffect, useState } from "react"
import { stats as mockStats } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { useStaggerReveal } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

export function StatsSection() {
  const { ref, isVisible } = useStaggerReveal({ threshold: 0.2 })
  const [stats, setStats] = useState(mockStats)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.getStats()
        if (data && data.length > 0) setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }
    loadStats()
  }, [])

  return (
    <section className="border-y border-border/60 bg-gradient-to-b from-muted/20 to-muted/50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "grid grid-cols-2 gap-8 lg:grid-cols-4 stagger-children",
          )}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "group text-center reveal transition-all",
                isVisible && "is-visible"
              )}
            >
              <p className="counter-value text-3xl font-bold tracking-tight text-primary sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <div className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-primary/30 transition-all duration-500 group-hover:w-16 group-hover:bg-primary/60" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
