'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionHeading, FilterChip, domainIcons } from '@/components/ui-components'
import { domains } from '@/data/mockData'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getProfile, getQuizResult, Profile, QuizResult } from '@/lib/store'
import { Compass, Search, ArrowRight, Sparkles, BookOpen } from 'lucide-react'

type FilterType =
  | 'all'
  | 'recommended'
  | 'high-demand'
  | 'beginner-friendly'
  | 'creative'
  | 'technical'

export default function ExplorePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
    setQuizResult(getQuizResult())
    setMounted(true)
  }, [])

  const recommendedDomainId = quizResult?.primaryDomain || null
  const preferredDomains = profile?.interests || []

  const filteredDomains = useMemo(() => {
    let result = [...domains]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((domain) => {
        return (
          domain.name.toLowerCase().includes(query) ||
          domain.description.toLowerCase().includes(query) ||
          domain.skills.some((skill: string) => skill.toLowerCase().includes(query))
        )
      })
    }

    switch (activeFilter) {
      case 'recommended':
        result = result.filter((domain) => domain.id === recommendedDomainId)
        break
      case 'high-demand':
        result = result.filter((domain) => domain.demand.toLowerCase() === 'high')
        break
      case 'beginner-friendly':
        result = result.filter(
          (domain) =>
            domain.difficulty.toLowerCase() === 'easy' ||
            domain.difficulty.toLowerCase() === 'beginner' ||
            domain.difficulty.toLowerCase() === 'low'
        )
        break
      case 'creative':
        result = result.filter(
          (domain) =>
            domain.name.toLowerCase().includes('ui') ||
            domain.name.toLowerCase().includes('web') ||
            domain.description.toLowerCase().includes('design')
        )
        break
      case 'technical':
        result = result.filter(
          (domain) =>
            domain.name.toLowerCase().includes('ai') ||
            domain.name.toLowerCase().includes('data') ||
            domain.name.toLowerCase().includes('cyber') ||
            domain.name.toLowerCase().includes('cloud')
        )
        break
      default:
        break
    }

    return result
  }, [searchQuery, activeFilter, recommendedDomainId])

  const getYearLabel = () => {
    if (!profile?.year) return null
    const yearNum = Number(profile.year)
    if (yearNum === 1) return 'Great for exploration in 1st year'
    if (yearNum === 2) return 'Good domain to start building in 2nd year'
    if (yearNum === 3) return 'Useful for internship preparation'
    if (yearNum === 4) return 'Relevant for placement readiness'
    return null
  }

  const yearHint = getYearLabel()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Compass className="h-8 w-8 text-primary" />
              </div>
            </div>

            <Badge variant="secondary" className="mb-4">
              Explore Career Paths
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Discover Your Career Domain
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore different tech career domains, understand what each involves,
              and find the path that best matches your interests and goals.
            </p>
          </div>

          {/* Personalized Hint */}
          {mounted && profile && (
            <Card className="mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">
                      Personalized for {profile.name.split(' ')[0]}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {recommendedDomainId
                      ? 'We highlighted the domain recommended by your quiz result.'
                      : 'Complete the career quiz to get a personalized domain recommendation.'}
                  </p>
                  {yearHint && (
                    <p className="text-sm text-primary mt-1">{yearHint}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  {!recommendedDomainId ? (
                    <Link href="/quiz">
                      <Button className="bg-primary hover:bg-primary/90">
                        Take Career Quiz
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/explore/${recommendedDomainId}`}>
                      <Button className="bg-primary hover:bg-primary/90">
                        View Recommended Domain
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domains, skills, or keywords..."
              className="pl-11 h-12 bg-card border-border"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button type="button" onClick={() => setActiveFilter('all')}>
              <FilterChip label="All Domains" isActive={activeFilter === 'all'} />
            </button>
            <button type="button" onClick={() => setActiveFilter('recommended')}>
              <FilterChip label="Recommended" isActive={activeFilter === 'recommended'} />
            </button>
            <button type="button" onClick={() => setActiveFilter('high-demand')}>
              <FilterChip label="High Demand" isActive={activeFilter === 'high-demand'} />
            </button>
            <button type="button" onClick={() => setActiveFilter('beginner-friendly')}>
              <FilterChip label="Beginner Friendly" isActive={activeFilter === 'beginner-friendly'} />
            </button>
            <button type="button" onClick={() => setActiveFilter('creative')}>
              <FilterChip label="Creative" isActive={activeFilter === 'creative'} />
            </button>
            <button type="button" onClick={() => setActiveFilter('technical')}>
              <FilterChip label="Technical" isActive={activeFilter === 'technical'} />
            </button>
          </div>

          {/* Domain Grid */}
          {filteredDomains.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDomains.map((domain) => {
                const IconComponent = domainIcons[domain.icon]
                const isRecommended = recommendedDomainId === domain.id
                const isPreferred = preferredDomains.includes(domain.id)

                return (
                  <Card
                    key={domain.id}
                    className={`bg-card transition-all hover:border-primary/50 group ${
                      isRecommended ? 'border-primary/60 shadow-lg shadow-primary/10' : 'border-border'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4 gap-3">
                        <div
                          className="h-14 w-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${domain.color}20` }}
                        >
                          {IconComponent && (
                            <IconComponent className="h-7 w-7" style={{ color: domain.color }} />
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="outline" className="text-xs">
                            {domain.difficulty}
                          </Badge>

                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              domain.demand.toLowerCase() === 'high'
                                ? 'border-success text-success'
                                : 'border-border text-muted-foreground'
                            }`}
                          >
                            {domain.demand} Demand
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {isRecommended && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Recommended for You
                          </Badge>
                        )}
                        {isPreferred && (
                          <Badge variant="secondary" className="text-xs">
                            Matches Your Interest
                          </Badge>
                        )}
                      </div>

                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {domain.name}
                      </CardTitle>

                      <CardDescription className="line-clamp-3">
                        {domain.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="mb-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          Key Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {domain.skills.slice(0, 3).map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {domain.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{domain.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link href={`/explore/${domain.id}`}>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Explore Domain
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>

                        <Link href={`/roadmaps/${domain.id}`}>
                          <Button variant="outline" className="w-full">
                            <BookOpen className="h-4 w-4 mr-2" />
                            View Roadmap
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="bg-card border-border max-w-2xl mx-auto">
              <CardContent className="p-10 text-center">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No domains found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try changing your search query or filters to explore more domains.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveFilter('all')
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Compare / Quiz CTA */}
          <div className="mt-16 text-center">
            <SectionHeading
              title="Not Sure Which Domain to Choose?"
              subtitle="Take our career quiz to get personalized recommendations based on your interests"
            />
            <Link href="/quiz">
              <Button className="bg-primary hover:bg-primary/90">
                Take Career Quiz
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}