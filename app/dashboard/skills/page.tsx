'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getProfile, getSkillProgress, getSavedRoadmaps } from '@/lib/store'
import { domains, roadmaps } from '@/data/mockData'
import {
  Target,
  CheckCircle2,
  Clock,
  Circle,
  BarChart3,
  Layers,
  TrendingUp,
} from 'lucide-react'

type SkillStatus = 'completed' | 'in-progress' | 'not-started'

export default function SkillTrackerPage() {
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null)
  const [allProgress, setAllProgress] = useState<ReturnType<typeof getSkillProgress>>({})
  const [savedRoadmapIds, setSavedRoadmapIds] = useState<string[]>([])
  const [selectedDomain, setSelectedDomain] = useState<string>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
    setAllProgress(getSkillProgress())
    const saved = getSavedRoadmaps()
    setSavedRoadmapIds(saved.map((r) => r.id))
    setMounted(true)
  }, [])

  const trackedDomains = useMemo(() => {
    if (!mounted) return []
    if (savedRoadmapIds.length === 0) return domains.filter((d) => roadmaps[d.id as keyof typeof roadmaps])
    return domains.filter((d) => savedRoadmapIds.includes(d.id) && roadmaps[d.id as keyof typeof roadmaps])
  }, [savedRoadmapIds])

  const skillData = useMemo(() => {
    const data: {
      domain: string
      domainId: string
      color: string
      skills: { name: string; status: SkillStatus; phase: string }[]
      completed: number
      inProgress: number
      total: number
    }[] = []

    const domainsToShow = selectedDomain === 'all' ? trackedDomains : trackedDomains.filter((d) => d.id === selectedDomain)

    domainsToShow.forEach((domain) => {
      const roadmap = roadmaps[domain.id as keyof typeof roadmaps]
      if (!roadmap) return

      const domainProgress = allProgress[domain.id]
      const skills: { name: string; status: SkillStatus; phase: string }[] = []

      roadmap.phases.forEach((phase) => {
        phase.skills.forEach((skill) => {
          const skillId = skill.name.toLowerCase().replace(/\s+/g, '-')
          let status: SkillStatus = 'not-started'

          if (domainProgress?.completedSkills?.includes(skillId)) {
            status = 'completed'
          } else if (domainProgress?.inProgressSkills?.includes(skillId)) {
            status = 'in-progress'
          }

          skills.push({ name: skill.name, status, phase: phase.name })
        })
      })

      data.push({
        domain: domain.name,
        domainId: domain.id,
        color: domain.color,
        skills,
        completed: skills.filter((s) => s.status === 'completed').length,
        inProgress: skills.filter((s) => s.status === 'in-progress').length,
        total: skills.length,
      })
    })

    return data
  }, [trackedDomains, allProgress, selectedDomain])

  const globalStats = useMemo(() => {
    let completed = 0
    let inProgress = 0
    let total = 0
    skillData.forEach((d) => {
      completed += d.completed
      inProgress += d.inProgress
      total += d.total
    })
    return { completed, inProgress, total, notStarted: total - completed - inProgress }
  }, [skillData])

  const statusIcon = (status: SkillStatus) => {
    if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-success" />
    if (status === 'in-progress') return <Clock className="h-4 w-4 text-amber-400" />
    return <Circle className="h-4 w-4 text-muted-foreground/40" />
  }

  const statusBadge = (status: SkillStatus) => {
    if (status === 'completed') return <Badge className="bg-success/15 text-success border-success/30 text-[10px]">Done</Badge>
    if (status === 'in-progress') return <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px]">In Progress</Badge>
    return <Badge variant="outline" className="text-[10px] text-muted-foreground">Not Started</Badge>
  }

  if (!mounted) return null

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Skill Tracker</h1>
            <p className="text-sm text-muted-foreground">
              {profile ? `Tracking skills for ${profile.name}` : 'Track your progress across all roadmap skills'}
            </p>
          </div>
        </div>
      </div>

      {/* Global Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Total Skills</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{globalStats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <p className="text-2xl font-bold text-success">{globalStats.completed}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <p className="text-2xl font-bold text-amber-400">{globalStats.inProgress}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Progress</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {globalStats.total > 0 ? Math.round((globalStats.completed / globalStats.total) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Domain Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedDomain('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedDomain === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          All Domains
        </button>
        {trackedDomains.map((domain) => (
          <button
            key={domain.id}
            type="button"
            onClick={() => setSelectedDomain(domain.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedDomain === domain.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {domain.name}
          </button>
        ))}
      </div>

      {/* Per-Domain Skill Breakdown */}
      <div className="space-y-6">
        {skillData.map((domain) => {
          const progress = domain.total > 0 ? Math.round((domain.completed / domain.total) * 100) : 0
          return (
            <Card key={domain.domainId} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: domain.color }}
                    />
                    <CardTitle className="text-lg">{domain.domain}</CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {domain.completed}/{domain.total} done
                    </span>
                    <Badge variant="outline" className="text-xs">{progress}%</Badge>
                  </div>
                </div>
                <Progress value={progress} className="h-2 mt-3" />
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {domain.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {statusIcon(skill.status)}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{skill.name}</p>
                          <p className="text-[10px] text-muted-foreground">{skill.phase}</p>
                        </div>
                      </div>
                      {statusBadge(skill.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {skillData.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="p-10 text-center">
              <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No skills tracked yet</h3>
              <p className="text-muted-foreground">
                Save a roadmap and start marking skills to see your progress here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
