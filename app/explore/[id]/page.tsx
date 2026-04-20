import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { domains, roadmaps, resources, projects, roles } from '@/data/mockData'
import { domainIcons } from '@/components/ui-components'
import {
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Briefcase,
  Code,
  Wrench,
  Users,
  DollarSign,
  CheckCircle2,
  Map,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Target,
  Building2,
} from 'lucide-react'

interface DomainPageProps {
  params: Promise<{ id: string }>
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { id } = await params
  const domain = domains.find((d) => d.id === id)

  if (!domain) {
    notFound()
  }

  const IconComponent = domainIcons[domain.icon]
  const roadmap = roadmaps[id as keyof typeof roadmaps]
  const domainResources = resources.filter((r) => r.domain === id)
  const domainProjects = projects.filter((p) => p.domain === id)
  const domainRoles = roles.filter((r) => r.domain === domain.name || r.domain.includes(domain.name.split(' ')[0]))

  const totalSkills = roadmap
    ? roadmap.phases.reduce((acc, phase) => acc + phase.skills.length, 0)
    : domain.skills.length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/explore"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Explore
            </Link>
          </div>

          {/* Hero Header */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex items-start gap-6">
                <div
                  className="h-20 w-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${domain.color}20` }}
                >
                  {IconComponent && (
                    <IconComponent className="h-10 w-10" style={{ color: domain.color }} />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">
                      {domain.name}
                    </h1>

                    <Badge variant="outline" className="border-success text-success">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {domain.demand} Demand
                    </Badge>

                    <Badge variant="outline">{domain.difficulty}</Badge>
                  </div>

                  <p className="text-lg text-muted-foreground max-w-3xl mb-4">
                    {domain.overview}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {domain.skills.slice(0, 5).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {domain.skills.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{domain.skills.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[220px]">
                <Link href={`/roadmaps/${domain.id}`}>
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 glow-primary">
                    <Map className="h-5 w-5 mr-2" />
                    Start This Roadmap
                  </Button>
                </Link>

                <Link href="/quiz">
                  <Button size="lg" variant="outline" className="w-full">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Take Career Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                </div>
                <p className="text-xl font-semibold text-foreground">{domain.difficulty}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Demand</p>
                </div>
                <p className="text-xl font-semibold text-success">{domain.demand}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Avg Salary</p>
                </div>
                <p className="text-xl font-semibold text-foreground">{domain.avgSalary}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Timeline</p>
                </div>
                <p className="text-xl font-semibold text-foreground">
                  {roadmap?.estimatedTime || '12-18 mo'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Total Skills</p>
                </div>
                <p className="text-xl font-semibold text-foreground">{totalSkills}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Skills Required */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Skills You&apos;ll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {domain.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Tools & Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {domain.tools.map((tool) => (
                      <div
                        key={tool}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted/30 border border-border"
                      >
                        <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Career Roles */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Career Roles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {domain.roles.map((role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{role}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Companies */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Top Companies Hiring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {domain.companies.map((company) => (
                      <div
                        key={company}
                        className="flex items-center justify-center p-4 rounded-lg bg-muted/30 border border-border text-center"
                      >
                        <span className="text-sm font-semibold text-foreground">{company}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Average package: <span className="text-success font-medium">{domain.avgSalary}</span>
                  </p>
                </CardContent>
              </Card>

              {/* Roadmap Preview */}
              {roadmap && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-primary" />
                      Roadmap Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roadmap.phases.map((phase, index) => (
                        <div
                          key={phase.name}
                          className="p-4 rounded-lg bg-muted/30 border border-border"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{phase.name}</h4>
                              <p className="text-xs text-muted-foreground">{phase.duration} • {phase.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 ml-11">
                            {phase.skills.slice(0, 4).map((skill) => (
                              <Badge key={skill.name} variant="secondary" className="text-[10px]">
                                {skill.name}
                              </Badge>
                            ))}
                            {phase.skills.length > 4 && (
                              <Badge variant="outline" className="text-[10px]">
                                +{phase.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href={`/roadmaps/${domain.id}`} className="block mt-6">
                      <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                        View Full Roadmap & Start Learning
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Best Suited For */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Best Suited For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {domain.suitableFor.map((type) => (
                      <li key={type} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                        {type}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Related Resources */}
              {domainResources.length > 0 && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Learning Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {domainResources.slice(0, 3).map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                        >
                          <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{resource.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-muted-foreground">{resource.source}</span>
                              <Badge variant="outline" className="text-[10px]">{resource.level}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Projects */}
              {domainProjects.length > 0 && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Project Ideas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {domainProjects.slice(0, 3).map((project) => (
                        <div
                          key={project.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                        >
                          <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{project.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-[10px]">{project.difficulty}</Badge>
                              <span className="text-[10px] text-muted-foreground">{project.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Final CTA */}
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Ready to start your {domain.name} journey?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Follow the structured roadmap and build real projects to become placement-ready.
                  </p>
                  <div className="space-y-3">
                    <Link href={`/roadmaps/${domain.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Start This Roadmap
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/quiz">
                      <Button variant="outline" className="w-full">
                        Is This Right for Me?
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return domains.map((domain) => ({
    id: domain.id,
  }))
}