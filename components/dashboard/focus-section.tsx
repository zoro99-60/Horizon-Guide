import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionCard } from '@/components/premium-ui'
import { Calendar, CheckCircle2, Clock, Play, BookOpen, Code, ArrowRight } from 'lucide-react'

export interface Task {
  id: number
  title: string
  duration: string
  type: string
  completed: boolean
  xp: number
}

interface FocusSectionProps {
  todaysTasks: Task[]
}

export function FocusSection({ todaysTasks }: FocusSectionProps) {
  const tasksCompletedToday = todaysTasks.filter(t => t.completed).length
  const totalXpToday = todaysTasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0)

  return (
    <SectionCard
      title="Today's Focus"
      description={`${tasksCompletedToday}/${todaysTasks.length} tasks completed`}
      icon={<Calendar className="h-5 w-5" />}
      action={{ label: 'View Planner', href: '#' }}
      badge={totalXpToday > 0 ? `+${totalXpToday} XP earned` : undefined}
    >
      <div className="space-y-3">
        {todaysTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              task.completed 
                ? 'bg-success/5 border border-success/20' 
                : 'bg-muted/30 border border-border/50 hover:border-primary/30'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                task.completed 
                  ? 'bg-success/10 text-success' 
                  : task.type === 'learn' 
                    ? 'bg-primary/10 text-primary'
                    : task.type === 'practice'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-warning/10 text-warning'
              }`}>
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : task.type === 'learn' ? (
                  <BookOpen className="h-5 w-5" />
                ) : task.type === 'practice' ? (
                  <Code className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className={`font-medium ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {task.duration}
                  </span>
                  <Badge className="bg-primary/10 text-primary border-0 text-xs">
                    +{task.xp} XP
                  </Badge>
                </div>
              </div>
            </div>
            {!task.completed && (
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Start
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
