import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionCard, ContentListItem } from '@/components/premium-ui'
import { EmptyState } from '@/components/shared/empty-state'
import { ReadinessMeter } from '@/components/ui-components'
import {
  Briefcase,
  Code,
  Target,
  Lightbulb,
  Users,
  FileText,
  ArrowUpRight,
  Calendar,
  Activity,
  BookOpen,
} from 'lucide-react'

// You might want to import this from a shared types module in a real scenario
export interface UpcomingMilestone {
  title: string
  date: string
  domain: string
  daysLeft: number
  priority: 'high' | 'medium' | 'low'
}

export interface ActivityItem {
  action: string
  time: string
  type: 'skill' | 'progress' | 'roadmap' | 'resource'
  points: number
  icon: any
}

export interface RecommendedResource {
  id: string
  title: string
  source: string
  level: string
}

interface SidebarStatsProps {
  placementReadiness: {
    overall: number
    technical: number
    dsa: number
    projects: number
    softSkills: number
  }
  upcomingMilestones: UpcomingMilestone[]
  recentActivity: ActivityItem[]
  recommendedResources: RecommendedResource[]
}

export function SidebarStats({
  placementReadiness,
  upcomingMilestones,
  recentActivity,
  recommendedResources,
}: SidebarStatsProps) {
  return (
    <div className="space-y-6">
      {/* Placement Readiness */}
      <Card className="bg-gradient-to-br from-card via-card to-secondary/5 border-border/50 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-heading">
              <Briefcase className="h-5 w-5 text-primary" />
              Placement Readiness
            </CardTitle>
            <Badge className="bg-warning/20 text-warning border-0 text-xs">
              {placementReadiness.overall}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <ReadinessMeter 
            label="Technical Skills" 
            value={placementReadiness.technical} 
            icon={<Code className="h-5 w-5" />}
            color="primary"
          />
          <ReadinessMeter 
            label="DSA & Problem Solving" 
            value={placementReadiness.dsa} 
            icon={<Target className="h-5 w-5" />}
            color="warning"
          />
          <ReadinessMeter 
            label="Projects & Portfolio" 
            value={placementReadiness.projects} 
            icon={<Lightbulb className="h-5 w-5" />}
            color="secondary"
          />
          <ReadinessMeter 
            label="Soft Skills" 
            value={placementReadiness.softSkills} 
            icon={<Users className="h-5 w-5" />}
            color="primary"
          />
          
          <div className="pt-3 mt-3 border-t border-border/30">
            <Link href="/dashboard/prep">
              <Button variant="outline" className="w-full" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Prep Tips
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      <SectionCard
        title="Upcoming Milestones"
        icon={<Target className="h-5 w-5" />}
      >
        <div className="space-y-3">
          {upcomingMilestones.map((milestone) => (
            <div
              key={milestone.title}
              className={`p-3 rounded-xl border transition-all ${
                milestone.priority === 'high' 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-muted/30 border-border/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  milestone.priority === 'high' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm line-clamp-1">{milestone.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs bg-muted/50">{milestone.domain}</Badge>
                    <span className={`text-xs font-medium ${
                      milestone.daysLeft <= 7 ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {milestone.daysLeft}d left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Recent Activity */}
      <SectionCard
        title="Recent Activity"
        icon={<Activity className="h-5 w-5" />}
      >
        <div className="space-y-3">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'skill' ? 'bg-success/10 text-success' :
                  activity.type === 'progress' ? 'bg-primary/10 text-primary' :
                  activity.type === 'roadmap' ? 'bg-secondary/10 text-secondary' :
                  'bg-warning/10 text-warning'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-1">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge variant="secondary" className="text-xs bg-success/10 text-success border-0">
                      +{activity.points} XP
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </SectionCard>

      {/* Recommended Resources */}
      <SectionCard
        title="Recommended"
        icon={<BookOpen className="h-5 w-5" />}
        action={{ label: 'All Resources', href: '/dashboard/resources' }}
      >
        {recommendedResources.length > 0 ? (
          <div className="space-y-2">
            {recommendedResources.map((resource) => (
              <ContentListItem
                key={resource.id}
                title={resource.title}
                description={resource.source}
                icon={<BookOpen className="h-4 w-4" />}
                badge={{ label: resource.level, variant: 'default' }}
                href={`/dashboard/resources/${resource.id}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="h-8 w-8" />}
            title="No resources yet"
            description="Complete more skills to get personalized recommendations."
            className="py-8"
          />
        )}
      </SectionCard>
    </div>
  )
}
