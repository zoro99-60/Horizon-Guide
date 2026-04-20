'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { getProfile } from '@/lib/store'
import {
  Calendar,
  Target,
  BookOpen,
  Briefcase,
  Code,
  Trophy,
  GraduationCap,
  Lightbulb,
  FileText,
  Users,
  Rocket,
  CheckCircle2,
} from 'lucide-react'

const yearPlans = [
  {
    year: 1,
    title: '1st Year — Explore & Build Foundations',
    subtitle: 'Discover your interests and build core programming skills',
    semesters: [
      {
        name: 'Semester 1',
        milestones: [
          { label: 'Learn a programming language (C/Python)', icon: Code, status: 'foundation' },
          { label: 'Complete introductory CS courses', icon: BookOpen, status: 'foundation' },
          { label: 'Participate in coding contests', icon: Trophy, status: 'optional' },
          { label: 'Join 1-2 technical clubs', icon: Users, status: 'recommended' },
        ],
        skills: ['C Programming', 'Basic Mathematics', 'Logic Building', 'Git Basics'],
      },
      {
        name: 'Semester 2',
        milestones: [
          { label: 'Build your first project', icon: Lightbulb, status: 'foundation' },
          { label: 'Learn Data Structures basics', icon: Code, status: 'foundation' },
          { label: 'Start exploring domains', icon: Target, status: 'recommended' },
          { label: 'Create GitHub profile', icon: FileText, status: 'recommended' },
        ],
        skills: ['Data Structures', 'OOP', 'HTML/CSS Basics', 'Problem Solving'],
      },
    ],
  },
  {
    year: 2,
    title: '2nd Year — Specialize & Build Projects',
    subtitle: 'Pick a domain, build portfolio projects, and get internship ready',
    semesters: [
      {
        name: 'Semester 3',
        milestones: [
          { label: 'Choose primary career domain', icon: Target, status: 'critical' },
          { label: 'Complete domain fundamentals', icon: BookOpen, status: 'foundation' },
          { label: 'Build 2-3 domain-specific projects', icon: Lightbulb, status: 'critical' },
          { label: 'Start competitive programming', icon: Code, status: 'recommended' },
        ],
        skills: ['Domain Fundamentals', 'Algorithms', 'Database Basics', 'API Development'],
      },
      {
        name: 'Semester 4',
        milestones: [
          { label: 'Apply for summer internships', icon: Briefcase, status: 'critical' },
          { label: 'Build portfolio website', icon: FileText, status: 'recommended' },
          { label: 'Contribute to open source', icon: Users, status: 'optional' },
          { label: 'Complete 100+ DSA problems', icon: Code, status: 'recommended' },
        ],
        skills: ['Advanced DSA', 'System Design Intro', 'Technical Writing', 'Teamwork'],
      },
    ],
  },
  {
    year: 3,
    title: '3rd Year — Internship & Advanced Skills',
    subtitle: 'Secure internships, deepen expertise, and prepare for placements',
    semesters: [
      {
        name: 'Semester 5',
        milestones: [
          { label: 'Complete a meaningful internship', icon: Briefcase, status: 'critical' },
          { label: 'Master advanced domain skills', icon: Rocket, status: 'critical' },
          { label: 'Build a capstone-level project', icon: Lightbulb, status: 'critical' },
          { label: 'Start placement preparation', icon: GraduationCap, status: 'recommended' },
        ],
        skills: ['Advanced Domain Skills', 'System Design', 'Cloud Basics', 'CI/CD'],
      },
      {
        name: 'Semester 6',
        milestones: [
          { label: 'Complete 300+ DSA problems', icon: Code, status: 'critical' },
          { label: 'Practice mock interviews', icon: Users, status: 'critical' },
          { label: 'Refine resume & portfolio', icon: FileText, status: 'critical' },
          { label: 'Apply to early placement drives', icon: Target, status: 'recommended' },
        ],
        skills: ['Mock Interviews', 'Behavioral Questions', 'Resume Optimization', 'Networking'],
      },
    ],
  },
  {
    year: 4,
    title: '4th Year — Placements & Career Launch',
    subtitle: 'Secure your first job and plan your career trajectory',
    semesters: [
      {
        name: 'Semester 7',
        milestones: [
          { label: 'Attend placement drives', icon: Briefcase, status: 'critical' },
          { label: 'Clear technical + HR rounds', icon: CheckCircle2, status: 'critical' },
          { label: 'Secure job offer', icon: Trophy, status: 'critical' },
          { label: 'Complete final year project', icon: Lightbulb, status: 'foundation' },
        ],
        skills: ['Advanced System Design', 'Negotiation', 'Professional Communication', 'Leadership'],
      },
      {
        name: 'Semester 8',
        milestones: [
          { label: 'Finalize FYP thesis/demo', icon: GraduationCap, status: 'foundation' },
          { label: 'Prepare for onboarding', icon: Rocket, status: 'recommended' },
          { label: 'Explore higher studies if interested', icon: BookOpen, status: 'optional' },
          { label: 'Mentor juniors', icon: Users, status: 'optional' },
        ],
        skills: ['Industry Readiness', 'Documentation', 'Presentation Skills', 'Mentorship'],
      },
    ],
  },
]

const statusColors: Record<string, string> = {
  critical: 'bg-red-500/15 text-red-400 border-red-500/30',
  foundation: 'bg-primary/15 text-primary border-primary/30',
  recommended: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  optional: 'bg-muted text-muted-foreground border-border',
}

const statusLabels: Record<string, string> = {
  critical: 'Critical',
  foundation: 'Foundation',
  recommended: 'Recommended',
  optional: 'Optional',
}

export default function PlannerPage() {
  const [activeYear, setActiveYear] = useState(1)
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const p = getProfile()
    setProfile(p)
    if (p?.year) {
      setActiveYear(Number(p.year))
    }
    setMounted(true)
  }, [])

  const plan = yearPlans.find((p) => p.year === activeYear)!

  if (!mounted) return null

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Year-wise Planner</h1>
            <p className="text-sm text-muted-foreground">
              {profile ? `Showing plan for Year ${activeYear} • ${profile.name}` : 'Your semester-by-semester roadmap to placement readiness'}
            </p>
          </div>
        </div>
      </div>

      {/* Year Tabs */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setActiveYear(year)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeYear === year
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            Year {year}
          </button>
        ))}
      </div>

      {/* Year Overview */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-1">{plan.title}</h2>
          <p className="text-muted-foreground">{plan.subtitle}</p>
        </CardContent>
      </Card>

      {/* Semesters */}
      <div className="space-y-8">
        {plan.semesters.map((semester) => (
          <Card key={semester.name} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">{semester.name}</CardTitle>
              <CardDescription>Key milestones and recommended skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Milestones */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">Milestones</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {semester.milestones.map((milestone) => {
                    const Icon = milestone.icon
                    return (
                      <div
                        key={milestone.label}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                      >
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{milestone.label}</p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] mt-1 ${statusColors[milestone.status]}`}
                          >
                            {statusLabels[milestone.status]}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">Recommended Skills</p>
                <div className="flex flex-wrap gap-2">
                  {semester.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card className="bg-card border-border mt-8">
        <CardContent className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">Priority Legend</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(statusLabels).map(([key, label]) => (
              <Badge key={key} variant="outline" className={`text-xs ${statusColors[key]}`}>
                {label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
