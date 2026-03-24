"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, BookOpen, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const initialStats = [
  { label: "Overall Progress", value: "45%", icon: TrendingUp, progress: 45, color: "text-primary" },
  { label: "Hours Learned", value: "98h", icon: Clock, color: "text-emerald-600 dark:text-emerald-400" },
  { label: "Skills Completed", value: "12/28", icon: BookOpen, color: "text-violet-600 dark:text-violet-400" },
  { label: "Current Phase", value: "Phase 2", icon: Target, color: "text-amber-600 dark:text-amber-400" },
]

export function ProgressOverview() {
  const [stats, setStats] = useState(initialStats)

  useEffect(() => {
    // We can fetch real student progress here in a real app
    // For now, we'll just keep it as is or fetch from a 'user-progress' endpoint if we had one.
    // Given our current models, these are mock dashboard stats.
  }, [])
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="group reveal is-visible border bg-card hover-lift press-effect cursor-default animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className={cn("rounded-lg bg-muted p-1.5 transition-all duration-300 group-hover:scale-110", stat.color)}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                {stat.value}
              </p>
              {stat.progress !== undefined && (
                <Progress value={stat.progress} className="mt-3 h-2" />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
