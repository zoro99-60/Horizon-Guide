'use client'

import { use, useEffect, useMemo, useState } from 'react'
import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { domains, roadmaps } from '@/data/mockData'
import {
  getProfile,
  saveRoadmap,
  getSavedRoadmaps,
  getSkillProgress,
  saveSkillProgress,
} from '@/lib/store'
import { ArrowLeft, ArrowRight, BookmarkCheck, UserCheck } from 'lucide-react'
import { RoadmapHeader } from '@/components/roadmap/roadmap-header'
import { PhaseCard } from '@/components/roadmap/phase-card'
import { domainIcons } from '@/components/ui-components'

interface RoadmapPageProps {
  params: Promise<{ id: string }>
}

type SkillStatus = 'not-started' | 'in-progress' | 'completed'

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const router = useRouter()
  const { id } = use(params)

  const domain = domains.find((d) => d.id === id)
  const roadmap = roadmaps[id as keyof typeof roadmaps]

  const [profileChecked, setProfileChecked] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  const [isSaved, setIsSaved] = useState(false)
  const [expandedPhases, setExpandedPhases] = useState<string[]>([])
  const [skillStatuses, setSkillStatuses] = useState<Record<string, SkillStatus>>({})

  const getSkillId = (skillName: string) => skillName.toLowerCase().replace(/\s+/g, '-')

  useEffect(() => {
    const profile = getProfile()
    setHasCompletedOnboarding(!!profile?.onboardingComplete)

    const savedRoadmaps = getSavedRoadmaps()
    const alreadySaved = Array.isArray(savedRoadmaps)
      ? savedRoadmaps.some((r: any) => r?.id === id || r?.domain === id)
      : false

    setIsSaved(alreadySaved)

    const allProgress = getSkillProgress()
    const domainProgress = allProgress?.[id]

    const statuses: Record<string, SkillStatus> = {}

    if (domainProgress && roadmap) {
      roadmap.phases.forEach((phase) => {
        phase.skills.forEach((skill) => {
          const skillId = getSkillId(skill.name)

          if (domainProgress.completedSkills?.includes(skillId)) {
            statuses[skill.name] = 'completed'
          } else if (domainProgress.inProgressSkills?.includes(skillId)) {
            statuses[skill.name] = 'in-progress'
          } else {
            statuses[skill.name] = 'not-started'
          }
        })
      })
    }

    setSkillStatuses(statuses)

    if (roadmap?.phases?.[0]) {
      setExpandedPhases([roadmap.phases[0].name])
    }

    setProfileChecked(true)
  }, [id, roadmap])

  const totalSkills = useMemo(() => {
    if (!roadmap) return 0
    return roadmap.phases.reduce((acc, phase) => acc + phase.skills.length, 0)
  }, [roadmap])

  const completedSkills = useMemo(() => {
    return Object.values(skillStatuses).filter((s) => s === 'completed').length
  }, [skillStatuses])

  const inProgressSkills = useMemo(() => {
    return Object.values(skillStatuses).filter((s) => s === 'in-progress').length
  }, [skillStatuses])

  const overallProgress = useMemo(() => {
    if (totalSkills === 0) return 0
    return Math.round((completedSkills / totalSkills) * 100)
  }, [completedSkills, totalSkills])

  if (!domain || !roadmap) {
    notFound()
  }

  const handleSaveRoadmap = () => {
    if (!isSaved) {
      saveRoadmap({
        id: domain.id,
        name: domain.name,
        savedAt: new Date().toISOString(),
      })
      setIsSaved(true)
    }

    router.push('/dashboard')
  }

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  const togglePhase = (phaseName: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseName)
        ? prev.filter((p) => p !== phaseName)
        : [...prev, phaseName]
    )
  }

  const persistSkillStatus = (skillName: string, newStatus: SkillStatus) => {
    const allProgress = getSkillProgress()
    const domainProgress = allProgress?.[id] || {
      domain: id,
      completedSkills: [],
      inProgressSkills: [],
    }

    const skillId = getSkillId(skillName)

    domainProgress.completedSkills = (domainProgress.completedSkills || []).filter(
      (s: string) => s !== skillId
    )
    domainProgress.inProgressSkills = (domainProgress.inProgressSkills || []).filter(
      (s: string) => s !== skillId
    )

    if (newStatus === 'completed') {
      domainProgress.completedSkills.push(skillId)
    } else if (newStatus === 'in-progress') {
      domainProgress.inProgressSkills.push(skillId)
    }

    saveSkillProgress(domainProgress)
  }

  const toggleSkillStatus = (skillName: string) => {
    const currentStatus = skillStatuses[skillName] || 'not-started'
    let newStatus: SkillStatus

    if (currentStatus === 'not-started') {
      newStatus = 'in-progress'
    } else if (currentStatus === 'in-progress') {
      newStatus = 'completed'
    } else {
      newStatus = 'not-started'
    }

    setSkillStatuses((prev) => ({
      ...prev,
      [skillName]: newStatus,
    }))

    persistSkillStatus(skillName, newStatus)
  }

  if (!profileChecked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading roadmap...</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
                  To personalize your roadmap experience, Horizon Guide needs your year,
                  branch, interests, and goals first.
                </p>
                <Link href="/onboarding">
                  <Button className="bg-primary hover:bg-primary/90">
                    Go to Onboarding
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/roadmaps"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Roadmaps
            </Link>
          </div>

          <RoadmapHeader
            domain={{
              name: domain.name,
              color: domain.color,
              difficulty: domain.difficulty,
              icon: domain.icon as keyof typeof domainIcons,
            }}
            roadmap={{
              estimatedTime: roadmap.estimatedTime,
              phases: roadmap.phases,
            }}
            isSaved={isSaved}
            onSave={handleSaveRoadmap}
            totalSkills={totalSkills}
            completedSkills={completedSkills}
            inProgressSkills={inProgressSkills}
            overallProgress={overallProgress}
          />

          <div className="space-y-4 relative">
            <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-border to-border/30 hidden md:block" />

            {roadmap.phases.map((phase, phaseIndex) => {
              const phaseSkillsCompleted = phase.skills.filter(
                (s) => skillStatuses[s.name] === 'completed'
              ).length

              const phaseSkillsInProgress = phase.skills.filter(
                (s) => skillStatuses[s.name] === 'in-progress'
              ).length

              const phaseProgress =
                phase.skills.length > 0
                  ? Math.round((phaseSkillsCompleted / phase.skills.length) * 100)
                  : 0

              const isPhaseCompleted = phaseProgress === 100
              const isPhaseActive =
                phaseSkillsInProgress > 0 ||
                (phaseSkillsCompleted > 0 && !isPhaseCompleted)

              const previousPhaseCompleted =
                phaseIndex === 0 ||
                roadmap.phases
                  .slice(0, phaseIndex)
                  .every((p) => p.skills.every((s) => skillStatuses[s.name] === 'completed'))

              const isLocked = phaseIndex > 0 && !previousPhaseCompleted && phaseProgress === 0

              return (
                <PhaseCard
                  key={phase.name}
                  phase={phase}
                  phaseIndex={phaseIndex}
                  domainColor={domain.color}
                  isExpanded={expandedPhases.includes(phase.name)}
                  isLocked={isLocked}
                  isPhaseCompleted={isPhaseCompleted}
                  isPhaseActive={isPhaseActive}
                  phaseProgress={phaseProgress}
                  skillStatuses={skillStatuses}
                  onTogglePhase={() => togglePhase(phase.name)}
                  onToggleSkillStatus={(skillName: string) => toggleSkillStatus(skillName)}
                />
              )
            })}
          </div>

          <Card className="mt-10 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {isSaved ? 'Roadmap Saved' : 'Save this roadmap to your dashboard'}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground max-w-xl">
                  {isSaved
                    ? 'Your roadmap is already saved. Continue tracking your progress from the dashboard.'
                    : 'Save this roadmap to your dashboard so you can continue your journey, track skills, and monitor progress.'}
                </p>
              </div>

              {isSaved ? (
                <Button className="bg-primary hover:bg-primary/90" onClick={handleGoToDashboard}>
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveRoadmap}>
                  Save Roadmap & Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}