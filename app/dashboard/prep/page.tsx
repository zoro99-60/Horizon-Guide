'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { getProfile, getSkillProgress, getSavedRoadmaps, getResumeChecklist, saveResumeChecklist } from '@/lib/store'
import {
  FileText,
  Code,
  Brain,
  BookOpen,
  Target,
  CheckCircle2,
  Circle,
  Clock,
  Briefcase,
  TrendingUp,
  Award,
  Lightbulb,
} from 'lucide-react'

const dsaTopics = [
  { name: 'Arrays & Strings', problems: 40, importance: 'Critical' },
  { name: 'Linked Lists', problems: 15, importance: 'High' },
  { name: 'Stacks & Queues', problems: 15, importance: 'High' },
  { name: 'Trees & BST', problems: 25, importance: 'Critical' },
  { name: 'Graphs & BFS/DFS', problems: 20, importance: 'Critical' },
  { name: 'Dynamic Programming', problems: 30, importance: 'Critical' },
  { name: 'Hash Maps', problems: 15, importance: 'High' },
  { name: 'Recursion & Backtracking', problems: 15, importance: 'High' },
  { name: 'Sorting & Searching', problems: 15, importance: 'Medium' },
  { name: 'Greedy Algorithms', problems: 10, importance: 'Medium' },
]

const resumeChecklist = [
  { item: 'Contact information & LinkedIn', section: 'Header' },
  { item: 'Professional summary (2-3 lines)', section: 'Header' },
  { item: 'Education with CGPA/percentage', section: 'Education' },
  { item: 'Technical skills categorized', section: 'Skills' },
  { item: '2-3 strong projects with descriptions', section: 'Projects' },
  { item: 'Quantified achievements & impact', section: 'Projects' },
  { item: 'Internship/work experience', section: 'Experience' },
  { item: 'Certifications & courses', section: 'Certifications' },
  { item: 'Achievements & awards', section: 'Achievements' },
  { item: 'Clean, ATS-friendly formatting', section: 'Format' },
]

const aptitudeCategories = [
  { name: 'Quantitative Aptitude', topics: ['Percentages', 'Profit/Loss', 'Time & Work', 'Probability'] },
  { name: 'Logical Reasoning', topics: ['Puzzles', 'Seating Arrangement', 'Blood Relations', 'Coding-Decoding'] },
  { name: 'Verbal Ability', topics: ['Reading Comprehension', 'Para Jumbles', 'Grammar', 'Vocabulary'] },
]

const importanceColors: Record<string, string> = {
  Critical: 'bg-red-500/15 text-red-400 border-red-500/30',
  High: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Medium: 'bg-primary/15 text-primary border-primary/30',
}

export default function PlacementPrepPage() {
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null)
  const [checkedResume, setCheckedResume] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
    setCheckedResume(getResumeChecklist())
    setMounted(true)
  }, [])

  const toggleResumeItem = (idx: number) => {
    setCheckedResume((prev) => {
      const updated = prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      saveResumeChecklist(updated)
      return updated
    })
  }

  const resumeProgress = Math.round((checkedResume.length / resumeChecklist.length) * 100)

  if (!mounted) return null

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Placement Prep</h1>
            <p className="text-sm text-muted-foreground">
              {profile ? `Get placement ready, ${profile.name.split(' ')[0]}!` : 'DSA, aptitude, resume preparation — all in one place'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* DSA Progress */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                DSA Topics
              </CardTitle>
              <CardDescription>Core data structures and algorithms for coding interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dsaTopics.map((topic) => (
                  <div key={topic.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-3">
                      <Brain className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{topic.name}</p>
                        <p className="text-[10px] text-muted-foreground">{topic.problems} practice problems</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${importanceColors[topic.importance]}`}>
                      {topic.importance}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Aptitude */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Aptitude Preparation
              </CardTitle>
              <CardDescription>Key aptitude categories tested in campus placements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aptitudeCategories.map((cat) => (
                <div key={cat.name} className="p-4 rounded-lg bg-muted/30 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-3">{cat.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resume Checklist */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Resume Checklist
              </CardTitle>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{checkedResume.length}/{resumeChecklist.length} done</span>
                <Badge variant="outline" className="text-xs">{resumeProgress}%</Badge>
              </div>
              <Progress value={resumeProgress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resumeChecklist.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleResumeItem(idx)}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors text-left"
                  >
                    {checkedResume.includes(idx) ? (
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm ${checkedResume.includes(idx) ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {item.item}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{item.section}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Quick Tips</h3>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-primary mt-0.5" />
                  <p>Solve at least 200 problems on LeetCode before placements.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-3.5 w-3.5 text-primary mt-0.5" />
                  <p>Practice company-specific questions from previous years.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-primary mt-0.5" />
                  <p>Mock interviews with peers 2-3 times a week.</p>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 text-primary mt-0.5" />
                  <p>Keep your resume to 1 page, ATS-friendly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
