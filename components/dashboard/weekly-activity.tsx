import { SectionCard } from '@/components/premium-ui'
import { Activity } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface WeeklyData {
  day: string
  hours: number
  skills: number
}

interface WeeklyActivityProps {
  data: WeeklyData[]
}

export function WeeklyActivitySection({ data }: WeeklyActivityProps) {
  const totalHours = data.reduce((acc, curr) => acc + curr.hours, 0)
  const totalSkills = data.reduce((acc, curr) => acc + curr.skills, 0)

  return (
    <SectionCard
      title="Weekly Activity"
      icon={<Activity className="h-5 w-5" />}
    >
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}h`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              formatter={(value: number) => [`${value} hours`, 'Learning Time']}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorHours)"
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-border/30">
        <div className="text-center">
          <p className="text-xl font-bold text-foreground font-heading">{totalHours}h</p>
          <p className="text-xs text-muted-foreground">Total this week</p>
        </div>
        <div className="w-px h-8 bg-border/50" />
        <div className="text-center">
          <p className="text-xl font-bold text-foreground font-heading">{totalSkills}</p>
          <p className="text-xs text-muted-foreground">Skills completed</p>
        </div>
        <div className="w-px h-8 bg-border/50" />
        <div className="text-center">
          <p className="text-xl font-bold text-success font-heading">+15%</p>
          <p className="text-xs text-muted-foreground">vs last week</p>
        </div>
      </div>
    </SectionCard>
  )
}
