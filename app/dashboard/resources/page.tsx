'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { resources, domains } from '@/data/mockData'
import { getQuizResult, getSavedRoadmaps } from '@/lib/store'
import {
  BookOpen,
  Search,
  Clock,
  ExternalLink,
  Video,
  FileText,
  Code,
  GraduationCap,
  Bookmark,
  Sparkles,
  Filter,
  Star,
} from 'lucide-react'

const typeIcons: Record<string, React.ElementType> = {
  course: GraduationCap,
  video: Video,
  documentation: FileText,
  practice: Code,
}

const typeColors: Record<string, string> = {
  course: 'bg-primary/15 text-primary',
  video: 'bg-red-500/15 text-red-400',
  documentation: 'bg-amber-500/15 text-amber-400',
  practice: 'bg-success/15 text-success',
}

const levelColors: Record<string, string> = {
  Beginner: 'border-success/50 text-success',
  Intermediate: 'border-amber-500/50 text-amber-400',
  Advanced: 'border-red-500/50 text-red-400',
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [domainFilter, setDomainFilter] = useState<string>('all')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [bookmarked, setBookmarked] = useState<string[]>([])
  const [recommendedDomainId, setRecommendedDomainId] = useState<string | null>(null)
  const [savedDomainIds, setSavedDomainIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const quiz = getQuizResult()
    if (quiz?.primaryDomain) setRecommendedDomainId(quiz.primaryDomain)
    const saved = getSavedRoadmaps()
    setSavedDomainIds(saved.map((r) => r.id))
    setMounted(true)
  }, [])

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id])
  }

  const { recommended, other } = useMemo(() => {
    if (!mounted) return { recommended: [], other: [] }

    let filtered = [...resources]

    // Domain filter
    if (domainFilter === 'bookmarked') {
      filtered = filtered.filter((r) => bookmarked.includes(r.id))
    } else if (domainFilter !== 'all') {
      filtered = filtered.filter((r) => r.domain === domainFilter)
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter((r) => r.level === levelFilter)
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((r) => r.type === typeFilter)
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.source.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Split into recommended and other
    const relevantDomains = [recommendedDomainId, ...savedDomainIds].filter(Boolean) as string[]

    if (relevantDomains.length > 0 && domainFilter === 'all') {
      const rec = filtered.filter((r) => relevantDomains.includes(r.domain))
      const rest = filtered.filter((r) => !relevantDomains.includes(r.domain))
      return { recommended: rec, other: rest }
    }

    return { recommended: [], other: filtered }
  }, [searchQuery, domainFilter, levelFilter, typeFilter, bookmarked, mounted, recommendedDomainId, savedDomainIds])

  if (!mounted) return null

  const totalResults = recommended.length + other.length
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced']
  const types = ['all', 'course', 'video', 'documentation', 'practice']

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Learning Resources</h1>
            <p className="text-sm text-muted-foreground">
              Curated courses, tutorials, and practice platforms to accelerate your learning
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search resources, topics, or platforms..."
          className="pl-11 h-11 bg-card border-border"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-8">
        {/* Domain filter */}
        <div className="flex flex-wrap gap-2">
          <FilterBtn label="All" active={domainFilter === 'all'} onClick={() => setDomainFilter('all')} />
          <FilterBtn
            label={`Bookmarked (${bookmarked.length})`}
            active={domainFilter === 'bookmarked'}
            onClick={() => setDomainFilter('bookmarked')}
          />
          {domains.map((d) => (
            <FilterBtn key={d.id} label={d.name} active={domainFilter === d.id} onClick={() => setDomainFilter(d.id)} />
          ))}
        </div>

        {/* Level + Type filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Level:</span>
            <div className="flex gap-1.5">
              {levels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLevelFilter(level)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                    levelFilter === level
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {level === 'all' ? 'All' : level}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Type:</span>
            <div className="flex gap-1.5">
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all capitalize ${
                    typeFilter === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'documentation' ? 'Docs' : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      {recommended.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Recommended for You</h2>
            <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]">Based on your roadmap</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isBookmarked={bookmarked.includes(resource.id)}
                onBookmark={() => toggleBookmark(resource.id)}
                isRecommended
              />
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      {other.length > 0 && (
        <div>
          {recommended.length > 0 && (
            <h2 className="text-lg font-semibold text-foreground mb-4">All Resources</h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {other.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isBookmarked={bookmarked.includes(resource.id)}
                onBookmark={() => toggleBookmark(resource.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalResults === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-10 text-center">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">Try changing your search query or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setDomainFilter('all')
                setLevelFilter('all')
                setTypeFilter('all')
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

// Resource Card Component
function ResourceCard({
  resource,
  isBookmarked,
  onBookmark,
  isRecommended,
}: {
  resource: (typeof resources)[0]
  isBookmarked: boolean
  onBookmark: () => void
  isRecommended?: boolean
}) {
  const TypeIcon = typeIcons[resource.type] || BookOpen
  const domain = domains.find((d) => d.id === resource.domain)

  return (
    <Card className={`bg-card border-border hover:border-primary/50 transition-all group ${isRecommended ? 'ring-1 ring-primary/20' : ''}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${typeColors[resource.type] || 'bg-muted'}`}>
            <TypeIcon className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            {isRecommended && (
              <Star className="h-3.5 w-3.5 text-primary fill-primary" />
            )}
            <button
              type="button"
              onClick={onBookmark}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            </button>
          </div>
        </div>

        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
          {resource.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">{resource.source}</span>
          <span className="text-muted-foreground/30">•</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {resource.duration}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="outline" className={`text-[10px] ${levelColors[resource.level] || ''}`}>
            {resource.level}
          </Badge>
          <Badge variant="outline" className="text-[10px] capitalize">{resource.type}</Badge>
          {domain && (
            <Badge variant="secondary" className="text-[10px]">{domain.name}</Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] text-muted-foreground">{tag}</Badge>
          ))}
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Open Resource
          <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
        </a>
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
