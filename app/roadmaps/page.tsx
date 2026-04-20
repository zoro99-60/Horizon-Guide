'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { domains, roadmaps } from '@/data/mockData'
import { domainIcons } from '@/components/ui-components'
import { getProfile, getQuizResult, getSavedRoadmaps } from '@/lib/store'
import {
  Map,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  BookmarkCheck,
  UserCheck,
} from 'lucide-react'

export default function RoadmapsPage() {
  const [profileChecked, setProfileChecked] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [recommendedDomainId, setRecommendedDomainId] = useState<string | null>(null)
  const [savedRoadmapIds, setSavedRoadmapIds] = useState<string[]>([])

  useEffect(() => {
    const profile = getProfile()
    const quizResult = getQuizResult()
    const savedRoadmaps = getSavedRoadmaps()

    setHasCompletedOnboarding(!!profile?.onboardingComplete)
    setRecommendedDomainId(quizResult?.primaryDomain || null)

    if (Array.isArray(savedRoadmaps)) {
      const ids = savedRoadmaps
        .map((item: any) => item?.id || item?.domain)
        .filter(Boolean)
      setSavedRoadmapIds(ids)
    }

    setProfileChecked(true)
  }, [])

  const availableRoadmaps = useMemo(() => {
    return domains.filter((d) => roadmaps[d.id as keyof typeof roadmaps])
  }, [])

  if (!profileChecked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading roadmaps...</p>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Map className="h-8 w-8 text-primary" />
              </div>
            </div>

            <Badge variant="secondary" className="mb-4">
              Career Roadmaps
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Your Path to Success
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore structured career roadmaps designed to take you from beginner to
              internship-ready and placement-ready. Each roadmap includes skills, phases,
              and practical guidance.
            </p>
          </div>

          {/* Guidance Cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {!hasCompletedOnboarding ? (
              <Card className="bg-card border-border">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Complete Onboarding First
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tell Horizon Guide about your year, branch, interests, and goals so we can
                      personalize the best roadmap for you.
                    </p>
                    <Link href="/onboarding">
                      <Button className="bg-primary hover:bg-primary/90">
                        Go to Onboarding
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : recommendedDomainId ? (
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Recommended for You
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on your quiz result, we recommend exploring the roadmap that matches
                      your strongest career fit.
                    </p>
                    <Link href={`/roadmaps/${recommendedDomainId}`}>
                      <Button className="bg-primary hover:bg-primary/90">
                        View Recommended Roadmap
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Not Sure Where to Start?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Take the Career Quiz to discover which domain fits your interests and
                      strengths best.
                    </p>
                    <Link href="/quiz">
                      <Button className="bg-primary hover:bg-primary/90">
                        Take Career Quiz
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BookmarkCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Save Roadmaps to Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Open any roadmap, review the phases, and save it to your dashboard so you can
                    track progress and skill completion.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roadmaps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRoadmaps.map((domain) => {
              const roadmap = roadmaps[domain.id as keyof typeof roadmaps]
              const IconComponent = domainIcons[domain.icon]
              const totalSkills = roadmap.phases.reduce(
                (acc, phase) => acc + phase.skills.length,
                0
              )

              const isRecommended = recommendedDomainId === domain.id
              const isSaved = savedRoadmapIds.includes(domain.id)

              return (
                <Card
                  key={domain.id}
                  className={`bg-card transition-all group hover:border-primary/50 ${
                    isRecommended
                      ? 'border-primary/60 shadow-lg shadow-primary/10'
                      : 'border-border'
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
                        <Badge variant="outline" className="text-xs border-success text-success">
                          {domain.demand}
                        </Badge>

                        {isRecommended && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Recommended
                          </Badge>
                        )}

                        {isSaved && (
                          <Badge variant="secondary" className="text-xs">
                            Saved
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {domain.name}
                    </CardTitle>

                    <CardDescription className="line-clamp-3">
                      {domain.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <Layers className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">
                          {roadmap.phases.length} Phases
                        </p>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-3">
                        <Clock className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">{roadmap.estimatedTime}</p>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-3">
                        <Map className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">{totalSkills} Skills</p>
                      </div>
                    </div>

                    {/* Phases Preview */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        {roadmap.phases.map((phase) => (
                          <div
                            key={phase.name}
                            className="flex-1 h-2 rounded-full bg-muted overflow-hidden"
                          >
                            <div className="h-full bg-primary/60 w-full" />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {roadmap.phases.map((phase) => phase.name).join(' • ')}
                      </p>
                    </div>

                    <Link href={`/roadmaps/${domain.id}`}>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Roadmap
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
                  Want the most suitable roadmap for your profile?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Take the Career Quiz to discover the domain that best matches your interests,
                  skills, and goals.
                </p>
                <Link href="/quiz">
                  <Button className="bg-primary hover:bg-primary/90">
                    Take Career Quiz
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}