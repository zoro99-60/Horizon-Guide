import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Zap, Play, ArrowRight, CircleDot, Trophy } from 'lucide-react'
import { Profile } from '@/lib/store'

interface WelcomeCardProps {
  profile: Profile | null
  primaryDomainName: string
  overallProgress: number
  completedSkills: number
  weeklyHours: number
  streak: number
}

export function WelcomeCard({ profile, primaryDomainName, overallProgress, completedSkills, weeklyHours, streak }: WelcomeCardProps) {
  const isMorning = new Date().getHours() < 12
  const isAfternoon = new Date().getHours() >= 12 && new Date().getHours() < 18
  const greeting = isMorning ? 'Morning' : isAfternoon ? 'Afternoon' : 'Evening'
  const firstName = profile?.name?.split(' ')[0] || 'Student'

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-card to-secondary/10 border-primary/20">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
      <CardContent className="relative p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-primary/20 text-primary border-0 px-3 py-1">
                <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                {profile?.year || 1}
                {(profile?.year || '1') === '1' ? 'st' : (profile?.year || '1') === '2' ? 'nd' : (profile?.year || '1') === '3' ? 'rd' : 'th'} Year
              </Badge>
              <Badge className="bg-muted/50 text-muted-foreground border-0 px-3 py-1">
                {primaryDomainName}
              </Badge>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-1">
              Good {greeting}, {firstName}!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {overallProgress < 10 
                ? "Let's kickstart your career journey today." 
                : overallProgress < 50 
                  ? "You're making great progress. Keep it up!"
                  : "Amazing work! You're well on your way to placement readiness."}
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center p-3 rounded-xl bg-background/50 border border-border/50">
                <p className="text-2xl font-bold text-foreground font-heading">{completedSkills}</p>
                <p className="text-xs text-muted-foreground">Skills Done</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-background/50 border border-border/50">
                <p className="text-2xl font-bold text-foreground font-heading">{weeklyHours}h</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-background/50 border border-border/50">
                <p className="text-2xl font-bold text-foreground font-heading">{streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </div>

          <div className="lg:w-80 flex flex-col items-center lg:items-end">
            <div className="w-full p-5 rounded-2xl bg-background/80 backdrop-blur border border-border/50 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">What to do next</p>
                  <p className="font-semibold text-foreground">{overallProgress > 0 ? "Continue Learning" : "Start your roadmap"}</p>
                </div>
              </div>
              <Link href="/explore" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  <Play className="h-4 w-4 mr-2" />
                  {overallProgress > 0 ? 'Resume Learning' : 'Start First Skill'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Career Roadmap Progress</span>
            <span className="text-sm font-semibold text-primary">{Math.round(overallProgress)}% Complete</span>
          </div>
          <div className="relative h-3 bg-muted/50 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-secondary rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(0, Math.min(100, overallProgress))}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CircleDot className="h-3 w-3 text-success" />
              Foundation
            </span>
            <span>Intermediate</span>
            <span>Advanced</span>
            <span className="flex items-center gap-1.5">
              <Trophy className="h-3 w-3" />
              Placement Ready
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
