"use client"

import { useState, useMemo } from "react"
import type { RoadmapPhase, Domain } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Star,
  Download,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Wrench,
  FolderKanban,
  ChevronDown,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface ResumeGeneratorProps {
  phases: RoadmapPhase[]
  domainInfo: Domain
  userSkills: string[]
  userLevel: string
  userBranch: string
}

interface ScoreBreakdown {
  category: string
  score: number
  maxScore: number
  feedback: string
  status: "excellent" | "good" | "needs-improvement"
}

function calculateResumeScore(
  phases: RoadmapPhase[],
  domainInfo: Domain,
  userSkills: string[],
  userLevel: string
): { totalScore: number; breakdown: ScoreBreakdown[] } {
  const allRoadmapSkills = phases.flatMap((p) => p.skills)
  const allTools = phases.flatMap((p) => p.tools)
  const allProjects = phases.flatMap((p) => p.projects)
  const domainSkills = domainInfo.skills

  // 1. Skills match (out of 30)
  const matchedSkills = userSkills.filter(
    (s) =>
      allRoadmapSkills.some((rs) => rs.toLowerCase().includes(s.toLowerCase())) ||
      domainSkills.some((ds) => ds.toLowerCase().includes(s.toLowerCase()))
  )
  const skillsRatio = Math.min(matchedSkills.length / Math.max(domainSkills.length, 1), 1)
  const skillsScore = Math.round(skillsRatio * 30)

  // 2. Experience level (out of 20)
  const levelScores: Record<string, number> = { Beginner: 8, Intermediate: 14, Advanced: 20 }
  const levelScore = levelScores[userLevel] || 8

  // 3. Tools coverage (out of 20)
  const toolMatchCount = userSkills.filter((s) =>
    allTools.some((t) => t.toLowerCase().includes(s.toLowerCase()))
  ).length
  const toolsRatio = Math.min(toolMatchCount / Math.max(Math.min(allTools.length, 6), 1), 1)
  const toolsScore = Math.round(toolsRatio * 20)

  // 4. Project potential (out of 15)
  const projectScore =
    userLevel === "Advanced" ? 15 : userLevel === "Intermediate" ? 10 : 6

  // 5. Domain alignment (out of 15)
  const domainAlignScore =
    matchedSkills.length >= 3 ? 15 : matchedSkills.length >= 1 ? 10 : 5

  const totalScore = skillsScore + levelScore + toolsScore + projectScore + domainAlignScore

  const getStatus = (
    score: number,
    max: number
  ): "excellent" | "good" | "needs-improvement" => {
    const pct = score / max
    if (pct >= 0.75) return "excellent"
    if (pct >= 0.5) return "good"
    return "needs-improvement"
  }

  const breakdown: ScoreBreakdown[] = [
    {
      category: "Technical Skills",
      score: skillsScore,
      maxScore: 30,
      feedback:
        skillsScore >= 20
          ? `Strong match with ${matchedSkills.length} relevant skills.`
          : `Consider adding more ${domainInfo.title}-specific skills from the roadmap.`,
      status: getStatus(skillsScore, 30),
    },
    {
      category: "Experience Level",
      score: levelScore,
      maxScore: 20,
      feedback:
        levelScore >= 14
          ? "Your experience level positions you well for mid-senior roles."
          : "Focus on building hands-on experience through projects.",
      status: getStatus(levelScore, 20),
    },
    {
      category: "Tools & Technologies",
      score: toolsScore,
      maxScore: 20,
      feedback:
        toolsScore >= 14
          ? "Good familiarity with industry-standard tools."
          : `Add tools like ${allTools.slice(0, 3).join(", ")} to strengthen your profile.`,
      status: getStatus(toolsScore, 20),
    },
    {
      category: "Project Portfolio",
      score: projectScore,
      maxScore: 15,
      feedback:
        projectScore >= 10
          ? "Your portfolio projects demonstrate practical ability."
          : `Build projects like "${allProjects[0]}" to showcase your skills.`,
      status: getStatus(projectScore, 15),
    },
    {
      category: "Domain Alignment",
      score: domainAlignScore,
      maxScore: 15,
      feedback:
        domainAlignScore >= 10
          ? `Well-aligned with ${domainInfo.title} industry requirements.`
          : "Strengthen your domain focus with specialized skills and certifications.",
      status: getStatus(domainAlignScore, 15),
    },
  ]

  return { totalScore, breakdown }
}

function getScoreColor(score: number) {
  if (score >= 75) return "text-emerald-600 dark:text-emerald-400"
  if (score >= 50) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent"
  if (score >= 65) return "Good"
  if (score >= 50) return "Average"
  return "Needs Work"
}

function getStatusIcon(status: "excellent" | "good" | "needs-improvement") {
  switch (status) {
    case "excellent":
      return <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
    case "good":
      return <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
    case "needs-improvement":
      return <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
  }
}

export function ResumeGenerator({
  phases,
  domainInfo,
  userSkills,
  userLevel,
  userBranch,
}: ResumeGeneratorProps) {
  const [isGenerated, setIsGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const { totalScore, breakdown } = useMemo(
    () => calculateResumeScore(phases, domainInfo, userSkills, userLevel),
    [phases, domainInfo, userSkills, userLevel]
  )

  const allSkillsFromPhases = useMemo(
    () => [...new Set(phases.flatMap((p) => p.skills))],
    [phases]
  )
  const allToolsFromPhases = useMemo(
    () => [...new Set(phases.flatMap((p) => p.tools))],
    [phases]
  )
  const allProjectsFromPhases = useMemo(
    () => [...new Set(phases.flatMap((p) => p.projects))],
    [phases]
  )

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerated(true)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <Card className="border bg-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Resume Generator & Score</CardTitle>
              <p className="text-xs text-muted-foreground">
                Generate a resume based on your development roadmap
              </p>
            </div>
          </div>
          {!isGenerated && (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              {isGenerating ? "Analyzing..." : "Generate Resume"}
            </Button>
          )}
        </div>
      </CardHeader>

      {isGenerated && (
        <CardContent className="flex flex-col gap-6 pt-0">
          {/* Score Overview */}
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 p-6 sm:flex-row sm:gap-8">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "text-5xl font-bold tracking-tighter",
                  getScoreColor(totalScore)
                )}
              >
                {totalScore}
              </div>
              <p className="text-xs font-medium text-muted-foreground">out of 100</p>
              <Badge
                variant={
                  totalScore >= 65 ? "default" : "secondary"
                }
                className="gap-1"
              >
                <Star className="h-3 w-3" />
                {getScoreLabel(totalScore)}
              </Badge>
            </div>
            <Separator orientation="vertical" className="hidden h-20 sm:block" />
            <Separator className="sm:hidden" />
            <div className="flex flex-1 flex-col gap-3">
              {breakdown.map((item) => (
                <div key={item.category} className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.score}/{item.maxScore}
                      </span>
                    </div>
                    <Progress
                      value={(item.score / item.maxScore) * 100}
                      className="mt-1 h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Feedback */}
          <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between gap-2 text-muted-foreground"
              >
                <span className="text-sm font-medium">Detailed Feedback & Suggestions</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    detailsOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-3 pt-2">
              {breakdown.map((item) => (
                <div
                  key={item.category}
                  className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3"
                >
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.category}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {item.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Resume Preview */}
          <div className="rounded-xl border border-border bg-background p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Resume Preview</h3>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.print()}>
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <h4 className="text-base font-bold text-foreground">
                  Engineering Student
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {userBranch} &middot; {domainInfo.title} Aspirant &middot;{" "}
                {userLevel} Level
              </p>
            </div>

            <Separator className="my-4" />

            {/* Objective */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">
                  Career Objective
                </h5>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Aspiring {domainInfo.title} professional with a strong foundation
                in {userBranch}. Seeking to leverage my skills in{" "}
                {userSkills.length > 0
                  ? userSkills.slice(0, 4).join(", ")
                  : domainInfo.skills.slice(0, 4).join(", ")}{" "}
                to contribute to innovative projects and grow in a dynamic
                engineering environment.
              </p>
            </div>

            <Separator className="my-4" />

            {/* Education */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">
                  Education
                </h5>
              </div>
              <div className="rounded-md bg-muted/40 p-3">
                <p className="text-sm font-medium text-foreground">
                  Bachelor of Engineering - {userBranch}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expected Graduation: 2027
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Technical Skills */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">
                  Technical Skills
                </h5>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allSkillsFromPhases.slice(0, 12).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Tools */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">
                  Tools & Technologies
                </h5>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allToolsFromPhases.slice(0, 10).map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Projects */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FolderKanban className="h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">
                  Key Projects
                </h5>
              </div>
              <ul className="flex flex-col gap-1.5">
                {allProjectsFromPhases.slice(0, 6).map((project) => (
                  <li
                    key={project}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
