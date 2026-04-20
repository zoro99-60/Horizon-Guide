'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertBanner } from '@/components/premium-ui'
import { LayoutDashboard, Flame, Star, UserCheck } from 'lucide-react'
import { WelcomeCard } from '@/components/dashboard/welcome-card'
import { FocusSection } from '@/components/dashboard/focus-section'
import {
  RoadmapProgressSection,
  RoadmapPhaseProgress,
} from '@/components/dashboard/roadmap-progress'
import { WeeklyActivitySection } from '@/components/dashboard/weekly-activity'
import {
  SidebarStats,
  UpcomingMilestone,
  ActivityItem,
} from '@/components/dashboard/sidebar-stats'
import { EmptyDashboardState } from '@/components/dashboard/empty-dashboard-state'
import {
  getProfile,
  getSavedRoadmaps,
  getSkillProgress,
  Profile,
  SavedRoadmap,
  SkillProgress,
  getQuizResult,
} from '@/lib/store'
import { domains, resources, roadmaps } from '@/data/mockData'
import { Navbar } from '@/components/navbar'
import { CheckCircle2, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// Mock Data for the dashboard that isn't dependent on local storage
const weeklyProgressData = [
  { day: 'Mon', hours: 2.5, skills: 1 },
  { day: 'Tue', hours: 3, skills: 0 },
  { day: 'Wed', hours: 2, skills: 1 },
  { day: 'Thu', hours: 4, skills: 2 },
  { day: 'Fri', hours: 3.5, skills: 1 },
  { day: 'Sat', hours: 5, skills: 3 },
  { day: 'Sun', hours: 2, skills: 0 },
]

const recentActivity: ActivityItem[] = [
  {
    action: 'Completed HTML5 & CSS3 Fundamentals',
    time: '2 hours ago',
    type: 'skill',
    points: 50,
    icon: CheckCircle2,
  },
  {
    action: 'Started JavaScript Basics module',
    time: '5 hours ago',
    type: 'progress',
    points: 10,
    icon: Play,
  },
]

const upcomingMilestones: UpcomingMilestone[] = [
  {
    title: 'Complete JavaScript Fundamentals',
    date: 'Dec 15',
    domain: 'Web Dev',
    daysLeft: 5,
    priority: 'high',
  },
  {
    title: 'Build Portfolio Website',
    date: 'Dec 20',
    domain: 'Project',
    daysLeft: 10,
    priority: 'medium',
  },
]

const todaysTasks = [
  { id: 1, title: 'Learn JavaScript ES6 Features', duration: '30 min', type: 'learn', completed: false, xp: 25 },
  { id: 2, title: 'Practice Array Methods', duration: '45 min', type: 'practice', completed: false, xp: 35 },
  { id: 3, title: 'Review DOM Manipulation', duration: '20 min', type: 'review', completed: true, xp: 15 },
]

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([])
  const [skillProgress, setSkillProgress] = useState<Record<string, SkillProgress>>({})
  const [recommendedDomainId, setRecommendedDomainId] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    const storedProfile = getProfile()
    const storedRoadmaps = getSavedRoadmaps()
    const storedSkillProgress = getSkillProgress()
    const quizResult = getQuizResult()

    setProfile(storedProfile || null)
    setSavedRoadmaps(Array.isArray(storedRoadmaps) ? storedRoadmaps : [])
    setSkillProgress(storedSkillProgress || {})
    setRecommendedDomainId(quizResult?.primaryDomain || null)
  }, [])

  const hasCompletedOnboarding = !!profile?.onboardingComplete

  const primaryRoadmapId = useMemo(() => {
    if (savedRoadmaps.length > 0) return savedRoadmaps[0].id
    return recommendedDomainId
  }, [savedRoadmaps, recommendedDomainId])

  const primaryDomain = useMemo(() => {
    return primaryRoadmapId ? domains.find((d) => d.id === primaryRoadmapId) : null
  }, [primaryRoadmapId])

  const primaryRoadmapTemplate = useMemo(() => {
    return primaryDomain ? roadmaps[primaryDomain.id as keyof typeof roadmaps] : null
  }, [primaryDomain])

  const currentSkillProgress = useMemo(() => {
    return primaryRoadmapId ? skillProgress[primaryRoadmapId] : null
  }, [primaryRoadmapId, skillProgress])

  const dashboardStats = useMemo(() => {
    let totalSkillsInRoadmap = 0
    let totalCompletedSkills = 0
    let totalInProgressSkills = 0
    let overallProgress = 0
    const phases: RoadmapPhaseProgress[] = []

    if (primaryRoadmapTemplate) {
      let completedPhases = 0

      primaryRoadmapTemplate.phases.forEach((phase) => {
        const phaseTotal = phase.skills.length

        const phaseCompleted = phase.skills.filter((s) =>
          currentSkillProgress?.completedSkills?.includes(
            s.name.toLowerCase().replace(/\s/g, '-')
          )
        ).length

        const phaseInProgress = phase.skills.filter((s) =>
          currentSkillProgress?.inProgressSkills?.includes(
            s.name.toLowerCase().replace(/\s/g, '-')
          )
        ).length

        const phaseProgress = phaseTotal > 0 ? (phaseCompleted / phaseTotal) * 100 : 0

        totalCompletedSkills += phaseCompleted
        totalInProgressSkills += phaseInProgress
        totalSkillsInRoadmap += phaseTotal

        let status: 'current' | 'locked' | 'completed' = 'locked'

        if (phaseProgress === 100) {
          status = 'completed'
          completedPhases++
        } else if (completedPhases === phases.length) {
          status = 'current'
        }

        phases.push({
          name: phase.name,
          progress: phaseProgress,
          status,
          skills: `${phaseCompleted}/${phaseTotal}`,
        })
      })

      if (totalSkillsInRoadmap > 0) {
        overallProgress = (totalCompletedSkills / totalSkillsInRoadmap) * 100
      }
    }

    return {
      totalSkillsInRoadmap,
      totalCompletedSkills,
      totalInProgressSkills,
      overallProgress,
      roadmapPhases: phases,
    }
  }, [primaryRoadmapTemplate, currentSkillProgress])

  const streak = 7
  const xpPoints = 1245

  const getProgressStatus = () => {
    if (dashboardStats.overallProgress >= 75) {
      return { label: 'Excellent Progress', variant: 'success' as const }
    }
    if (dashboardStats.overallProgress >= 50) {
      return { label: 'On Track', variant: 'success' as const }
    }
    if (dashboardStats.overallProgress >= 25) {
      return { label: 'Building Momentum', variant: 'warning' as const }
    }
    return { label: 'Just Started', variant: 'info' as const }
  }

  const progressStatus = getProgressStatus()

  const recommendedResources = useMemo(() => {
    return primaryDomain
      ? resources.filter((r) => r.domain === primaryDomain.id).slice(0, 3)
      : []
  }, [primaryDomain])

  const placementReadiness = {
    overall: 58,
    technical: 72,
    dsa: 45,
    projects: 60,
    softSkills: 55,
  }

  if (!isMounted) {
    return null
  }

  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <UserCheck className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Complete Onboarding First
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  To personalize your dashboard, Horizon Guide needs your year, branch,
                  interests, and goals first.
                </p>
                <Link href="/onboarding">
                  <Button className="bg-primary hover:bg-primary/90">
                    Go to Onboarding
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <header className="sticky top-0 z-30 pt-16 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold font-heading text-foreground">
                  Dashboard
                </h1>
                {(savedRoadmaps.length > 0 || recommendedDomainId) && (
                  <Badge
                    className={`text-xs border-0 ${
                      progressStatus.variant === 'success'
                        ? 'bg-success/20 text-success'
                        : progressStatus.variant === 'warning'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {progressStatus.label}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                Welcome back, {profile?.name?.split(' ')[0] || 'Student'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-sm font-semibold text-warning">{streak} day streak</span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {xpPoints.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 lg:p-8 space-y-6">
        {savedRoadmaps.length === 0 && !recommendedDomainId ? (
          <EmptyDashboardState profileName={profile?.name?.split(' ')[0] || 'Student'} />
        ) : (
          <>
            {showAlert && dashboardStats.overallProgress < 25 && primaryDomain && (
              <AlertBanner
                variant="info"
                title="Get started with your roadmap"
                description="You're just getting started! Complete your first skill to build momentum and unlock achievements."
                action={{ label: 'Start Learning', href: `/roadmaps/${primaryDomain.id}` }}
                dismissible
                onDismiss={() => setShowAlert(false)}
              />
            )}

            {!savedRoadmaps.length && recommendedDomainId && (
              <AlertBanner
                variant="info"
                title="Recommended roadmap available"
                description="You have a recommended domain from your quiz, but you haven't saved a roadmap yet."
                action={{
                  label: 'View Recommended Roadmap',
                  href: `/roadmaps/${recommendedDomainId}`,
                }}
                dismissible
              />
            )}

            <WelcomeCard
              profile={profile}
              primaryDomainName={primaryDomain?.name || 'Your Domain'}
              overallProgress={dashboardStats.overallProgress}
              completedSkills={dashboardStats.totalCompletedSkills}
              weeklyHours={22}
              streak={streak}
            />

            <FocusSection todaysTasks={todaysTasks} />

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RoadmapProgressSection
                  phases={dashboardStats.roadmapPhases.length > 0 ? dashboardStats.roadmapPhases : []}
                  domainId={primaryDomain?.id || ''}
                />
                <WeeklyActivitySection data={weeklyProgressData} />
              </div>

              <div className="space-y-6">
                <SidebarStats
                  placementReadiness={placementReadiness}
                  upcomingMilestones={upcomingMilestones}
                  recentActivity={recentActivity}
                  recommendedResources={recommendedResources.map((r) => ({
                    ...r,
                    id: String(r.id),
                  }))}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}