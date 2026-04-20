'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { projects, domains } from '@/data/mockData'
import { getProfile, getQuizResult } from '@/lib/store'
import {
  Lightbulb,
  Search,
  Clock,
  Star,
  Layers,
  Sparkles,
  Filter,
  Briefcase,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'

const difficultyColors: Record<string, string> = {
  Beginner: 'border-success/50 text-success bg-success/10',
  Intermediate: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
  Advanced: 'border-red-500/50 text-red-400 bg-red-500/10',
}

const categoryLabels: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  beginner: { label: 'Starter Project', icon: Star, color: 'bg-success/15 text-success border-success/30' },
  resume: { label: 'Resume Worthy', icon: Briefcase, color: 'bg-primary/15 text-primary border-primary/30' },
  'final-year': { label: 'Final Year Project', icon: GraduationCap, color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [domainFilter, setDomainFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null)
  const [recommendedDomainId, setRecommendedDomainId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
    const quiz = getQuizResult()
    if (quiz?.primaryDomain) setRecommendedDomainId(quiz.primaryDomain)
    setMounted(true)
  }, [])

  const userYear = profile?.year ? Number(profile.year) : null

  const { recommended, other } = useMemo(() => {
    if (!mounted) return { recommended: [], other: [] }

    let filtered = [...projects]

    // Domain filter
    if (domainFilter === 'for-you' && userYear) {
      filtered = filtered.filter((p) => p.year.includes(userYear))
    } else if (domainFilter !== 'all') {
      filtered = filtered.filter((p) => p.domain === domainFilter)
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter((p) => p.difficulty === difficultyFilter)
    }

    // Year filter
    if (yearFilter !== 'all') {
      const y = Number(yearFilter)
      filtered = filtered.filter((p) => p.year.includes(y))
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      )
    }

    // Split recommended
    if (recommendedDomainId && domainFilter === 'all' && difficultyFilter === 'all' && yearFilter === 'all') {
      const rec = filtered.filter((p) => p.domain === recommendedDomainId || (userYear && p.year.includes(userYear)))
      const rest = filtered.filter((p) => !rec.includes(p))
      return { recommended: rec, other: rest }
    }

    return { recommended: [], other: filtered }
  }, [searchQuery, domainFilter, difficultyFilter, yearFilter, userYear, mounted, recommendedDomainId])

  if (!mounted) return null

  const totalResults = recommended.length + other.length
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']
  const years = ['all', '1', '2', '3', '4']

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Project Ideas</h1>
            <p className="text-sm text-muted-foreground">Build projects to strengthen your portfolio, resume, and skills</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, skills, or domains..."
          className="pl-11 h-11 bg-card border-border"
        />
      </div>

      {/* Domain Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <FilterBtn label="All Projects" active={domainFilter === 'all'} onClick={() => setDomainFilter('all')} />
        {userYear && (
          <FilterBtn
            label={`For Year ${userYear}`}
            active={domainFilter === 'for-you'}
            onClick={() => setDomainFilter('for-you')}
          />
        )}
        {domains
          .filter((d) => projects.some((p) => p.domain === d.id))
          .map((d) => (
            <FilterBtn key={d.id} label={d.name} active={domainFilter === d.id} onClick={() => setDomainFilter(d.id)} />
          ))}
      </div>

      {/* Difficulty + Year Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">Difficulty:</span>
          <div className="flex gap-1.5">
            {difficulties.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficultyFilter(d)}
                className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                  difficultyFilter === d
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Year:</span>
          <div className="flex gap-1.5">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYearFilter(y)}
                className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                  yearFilter === y
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                {y === 'all' ? 'All' : `Year ${y}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Projects */}
      {recommended.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Recommended for You</h2>
            <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]">
              Based on your profile
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map((project) => (
              <ProjectCard key={project.id} project={project} isRecommended />
            ))}
          </div>
        </div>
      )}

      {/* Other Projects */}
      {other.length > 0 && (
        <div>
          {recommended.length > 0 && (
            <h2 className="text-lg font-semibold text-foreground mb-4">All Projects</h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {other.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalResults === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-10 text-center">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setDomainFilter('all')
                setDifficultyFilter('all')
                setYearFilter('all')
              }}
            >
              Reset All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ProjectCard({ project, isRecommended }: { project: (typeof projects)[0]; isRecommended?: boolean }) {
  const domain = domains.find((d) => d.id === project.domain)
  const cat = project.category ? categoryLabels[project.category] : null
  const CatIcon = cat?.icon

  return (
    <Card className={`bg-card border-border hover:border-primary/50 transition-all group h-full ${isRecommended ? 'ring-1 ring-primary/20' : ''}`}>
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            {isRecommended && (
              <Star className="h-3.5 w-3.5 text-primary fill-primary" />
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant="outline" className={`text-[10px] ${difficultyColors[project.difficulty] || ''}`}>
              {project.difficulty}
            </Badge>
            {cat && (
              <Badge variant="outline" className={`text-[10px] ${cat.color}`}>
                {CatIcon && <CatIcon className="h-2.5 w-2.5 mr-1" />}
                {cat.label}
              </Badge>
            )}
          </div>
        </div>

        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {project.duration}
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-3 w-3" />
            Year {project.year.join(', ')}
          </div>
          {domain && (
            <div className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {domain.name}
            </div>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1.5">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {project.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1.5">Tools</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <Badge key={tool} variant="outline" className="text-[10px]">{tool}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-card border border-border text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
    </button>
  )
}
