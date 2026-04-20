import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SkillItem } from '@/components/roadmap/skill-item'
import { Lock, Trophy, Zap, ChevronUp, ChevronDown, CheckCircle2, Wrench, Lightbulb } from 'lucide-react'

interface PhaseCardProps {
  phase: any
  phaseIndex: number
  domainColor: string
  isExpanded: boolean
  isLocked: boolean
  isPhaseCompleted: boolean
  isPhaseActive: boolean
  phaseProgress: number
  skillStatuses: Record<string, 'not-started' | 'in-progress' | 'completed'>
  onTogglePhase: () => void
  onToggleSkillStatus: (skillName: string) => void
}

export function PhaseCard({
  phase,
  phaseIndex,
  domainColor,
  isExpanded,
  isLocked,
  isPhaseCompleted,
  isPhaseActive,
  phaseProgress,
  skillStatuses,
  onTogglePhase,
  onToggleSkillStatus
}: PhaseCardProps) {
  const phaseSkillsCompleted = phase.skills.filter(
    (s: any) => skillStatuses[s.name] === 'completed'
  ).length

  return (
    <div className="relative">
      <Card
        className={`bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
          isExpanded ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-border/50 hover:border-primary/30'
        } ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <button
          onClick={onTogglePhase}
          className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between text-left hover:bg-muted/20 transition-colors"
          disabled={isLocked}
        >
          <div className="flex items-center gap-5 mb-4 md:mb-0">
            <div
              className={`h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-bold transition-all flex-shrink-0 ${
                isPhaseCompleted
                  ? 'bg-success/20 text-success shadow-sm shadow-success/10'
                  : isPhaseActive
                    ? 'shadow-lg'
                    : 'bg-muted/50 text-muted-foreground'
              }`}
              style={{ 
                backgroundColor: !isPhaseCompleted && isPhaseActive ? `${domainColor}20` : undefined,
                color: !isPhaseCompleted && isPhaseActive ? domainColor : undefined,
                boxShadow: isPhaseActive && !isPhaseCompleted ? `0 8px 32px ${domainColor}20` : undefined
              }}
            >
              {isLocked ? (
                <Lock className="h-6 w-6" />
              ) : isPhaseCompleted ? (
                <Trophy className="h-6 w-6" />
              ) : (
                <span className="font-heading">{String(phaseIndex + 1).padStart(2, '0')}</span>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-foreground font-heading">{phase.name}</h3>
                {isPhaseActive && !isPhaseCompleted && (
                  <Badge className="bg-primary/20 text-primary border-0 text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                )}
                {isPhaseCompleted && (
                  <Badge className="bg-success/20 text-success border-0 text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {phase.duration} &bull; {phase.skills.length} skills
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto mt-2 md:mt-0">
            <div className="flex items-center gap-4 flex-1 md:flex-none justify-end">
              <div className="w-24 sm:w-36">
                <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPhaseCompleted ? 'bg-success' : 'bg-primary'
                    }`}
                    style={{ width: `${phaseProgress}%` }}
                  />
                </div>
              </div>
              <span className={`text-sm font-semibold w-12 text-right ${
                phaseProgress >= 100 ? 'text-success' : phaseProgress > 0 ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {phaseProgress}%
              </span>
            </div>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
              isExpanded ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'
            }`}>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </div>
        </button>

        {isExpanded && (
          <div className="border-t border-border/50">
            <CardContent className="p-6 pt-5">
              <p className="text-muted-foreground mb-8 leading-relaxed">{phase.description}</p>

              {/* Skills Grid */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Skills to Master ({phaseSkillsCompleted}/{phase.skills.length})
                </h4>
                <div className="space-y-2">
                  {phase.skills.map((skill: any) => (
                    <SkillItem
                      key={skill.name}
                      name={skill.name}
                      description={skill.description}
                      status={skillStatuses[skill.name] || 'not-started'}
                      onToggle={() => onToggleSkillStatus(skill.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-secondary/10 flex items-center justify-center">
                    <Wrench className="h-3.5 w-3.5 text-secondary" />
                  </div>
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {phase.tools.map((tool: string) => (
                    <Badge 
                      key={tool} 
                      variant="secondary" 
                      className="bg-muted/50 text-foreground hover:bg-muted transition-colors"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Suggested Projects */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-warning/10 flex items-center justify-center">
                    <Lightbulb className="h-3.5 w-3.5 text-warning" />
                  </div>
                  Suggested Projects
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {phase.projects.map((project: string) => (
                    <div
                      key={project}
                      className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Lightbulb className="h-4 w-4 text-warning" />
                        </div>
                        <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {project}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  )
}
