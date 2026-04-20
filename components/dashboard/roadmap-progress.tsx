import { SectionCard } from '@/components/premium-ui'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Map, CheckCircle2 } from 'lucide-react'

export interface RoadmapPhaseProgress {
  name: string
  progress: number
  status: 'current' | 'locked' | 'completed'
  skills: string
}

interface RoadmapProgressProps {
  phases: RoadmapPhaseProgress[]
  domainId: string
}

export function RoadmapProgressSection({ phases, domainId }: RoadmapProgressProps) {
  return (
    <SectionCard
      title="Roadmap Progress"
      icon={<Map className="h-5 w-5" />}
      action={{ label: 'Full Roadmap', href: `/roadmaps/${domainId}` }}
    >
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const isActive = phase.status === 'current'
          const isCompleted = phase.status === 'completed' || phase.progress === 100
          const isLocked = phase.status === 'locked'
          
          return (
            <div key={phase.name} className="relative">
              {index < phases.length - 1 && (
                <div className="absolute left-[1.1rem] top-[3.5rem] h-6 w-0.5 bg-gradient-to-b from-border to-transparent" />
              )}
              
              <div className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                isActive ? 'bg-primary/5 border border-primary/20' : 
                isLocked ? 'bg-muted/10 border border-transparent opacity-60' :
                'bg-muted/20 border border-transparent'
              }`}>
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : isActive
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{phase.name}</span>
                      {isActive && !isCompleted && (
                        <Badge className="bg-primary/20 text-primary border-0 text-xs">Current</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{phase.skills}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Progress value={phase.progress} className="h-2" />
                    </div>
                    <span className={`text-sm font-medium w-10 text-right ${
                      phase.progress >= 80 ? 'text-success' : phase.progress > 0 ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {Math.round(phase.progress)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
