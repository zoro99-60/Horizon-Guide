import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { domainIcons } from '@/components/ui-components'
import { Sparkles, Clock, CheckCircle2, Target, BookmarkPlus, BookmarkCheck, Play } from 'lucide-react'

interface RoadmapHeaderProps {
  domain: { name: string; color: string; difficulty: string; icon: keyof typeof domainIcons }
  roadmap: { estimatedTime: string; phases: any[] }
  isSaved: boolean
  onSave: () => void
  totalSkills: number
  completedSkills: number
  inProgressSkills: number
  overallProgress: number
}

// Get progress message
const getProgressMessage = (progress: number) => {
  if (progress === 0) return { text: 'Ready to Begin', color: 'text-muted-foreground' }
  if (progress < 25) return { text: 'Just Getting Started', color: 'text-primary' }
  if (progress < 50) return { text: 'Building Foundation', color: 'text-primary' }
  if (progress < 75) return { text: 'Making Great Progress', color: 'text-success' }
  if (progress < 100) return { text: 'Almost There!', color: 'text-success' }
  return { text: 'Roadmap Complete!', color: 'text-success' }
}

export function RoadmapHeader({
  domain,
  roadmap,
  isSaved,
  onSave,
  totalSkills,
  completedSkills,
  inProgressSkills,
  overallProgress
}: RoadmapHeaderProps) {
  const IconComponent = domainIcons[domain.icon]
  const progressMessage = getProgressMessage(overallProgress)

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex items-start gap-5">
            <div
              className="h-18 w-18 p-4 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ backgroundColor: `${domain.color}20`, boxShadow: `0 8px 32px ${domain.color}20` }}
            >
              {IconComponent && <IconComponent className="h-9 w-9" style={{ color: domain.color }} />}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-primary/20 text-primary border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Curated Path
                </Badge>
                <Badge variant="secondary" className="bg-muted/50">
                  {domain.difficulty}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground mb-3">
                {domain.name} Roadmap
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {roadmap.estimatedTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  {totalSkills} Skills
                </span>
                <span className="flex items-center gap-1.5">
                  <Target className="h-4 w-4" />
                  {roadmap.phases.length} Phases
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={onSave}
            size="lg"
            variant={isSaved ? 'secondary' : 'default'}
            className={isSaved ? '' : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-5 w-5 mr-2" />
                Saved to Dashboard
              </>
            ) : (
              <>
                <BookmarkPlus className="h-5 w-5 mr-2" />
                Save Roadmap
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border/50 mb-10 overflow-hidden">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            <div className="flex items-center gap-6">
              <div className="relative h-28 w-28 flex-shrink-0">
                <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={overallProgress >= 80 ? 'hsl(var(--success))' : 'hsl(var(--primary))'}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${overallProgress * 2.51} 251`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-heading text-foreground">{overallProgress}%</span>
                </div>
              </div>
              <div>
                <p className={`text-lg font-semibold ${progressMessage.color}`}>{progressMessage.text}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {completedSkills} of {totalSkills} skills completed
                </p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-4 lg:gap-6">
              <div className="p-4 rounded-xl bg-success/5 border border-success/20 text-center">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <p className="text-2xl font-bold text-success font-heading">{completedSkills}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="p-4 rounded-xl bg-warning/5 border border-warning/20 text-center">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-2">
                  <Play className="h-5 w-5 text-warning" />
                </div>
                <p className="text-2xl font-bold text-warning font-heading">{inProgressSkills}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-2">
                  <Target className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground font-heading">{totalSkills - completedSkills - inProgressSkills}</p>
                <p className="text-xs text-muted-foreground">Remaining</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/30">
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-muted-foreground">Progress through all phases</span>
              <span className="font-medium text-foreground">{completedSkills}/{totalSkills} skills</span>
            </div>
            <div className="relative h-3 bg-muted/50 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-success rounded-full transition-all duration-1000"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
