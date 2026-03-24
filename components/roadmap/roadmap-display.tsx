"use client"

import { useState } from "react"
import type { RoadmapPhase } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, CheckCircle2, Wrench, BookOpen, FolderKanban } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoadmapDisplayProps {
  phases: RoadmapPhase[]
  domainTitle: string
}

export function RoadmapDisplay({ phases, domainTitle }: RoadmapDisplayProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold text-foreground">
          Your{" "}
          <span className="gradient-text">{domainTitle}</span>{" "}
          Roadmap
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A personalized 20-week learning journey
        </p>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-4">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

        {phases.map((phase, i) => (
          <div
            key={phase.title}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <PhaseCard phase={phase} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex gap-4">
        {/* Timeline dot */}
        <div
          className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background text-sm font-bold transition-all duration-300",
            isOpen
              ? "border-primary text-primary shadow-[0_0_12px_2px] shadow-primary/25"
              : "border-border text-muted-foreground hover:border-primary/60 hover:text-primary"
          )}
        >
          {index + 1}
        </div>

        <Card
          className={cn(
            "flex-1 border bg-card transition-all duration-300",
            isOpen ? "shadow-md shadow-black/5" : "hover:border-primary/30 hover:shadow-sm"
          )}
        >
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between p-4 text-left group">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {phase.title}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-primary">{phase.weeks}</p>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-all duration-300 ease-spring",
                  isOpen && "rotate-180 text-primary"
                )}
              />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-down">
            <CardContent className="border-t px-4 pb-4 pt-4">
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {phase.description}
              </p>

              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="skills" className="gap-1.5 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="gap-1.5 text-xs">
                    <Wrench className="h-3.5 w-3.5" />
                    Tools
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="gap-1.5 text-xs">
                    <BookOpen className="h-3.5 w-3.5" />
                    Resources
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="gap-1.5 text-xs">
                    <FolderKanban className="h-3.5 w-3.5" />
                    Projects
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="skills" className="mt-3 animate-fade-in">
                  <div className="flex flex-wrap gap-2">
                    {phase.skills.map((s) => (
                      <Badge key={s} variant="secondary" className="transition-all hover:bg-primary/20 hover:text-primary cursor-default">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tools" className="mt-3 animate-fade-in">
                  <div className="flex flex-wrap gap-2">
                    {phase.tools.map((t) => (
                      <Badge key={t} variant="outline" className="transition-all hover:border-primary/40 hover:text-primary cursor-default">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-3 animate-fade-in">
                  <ul className="flex flex-col gap-1.5">
                    {phase.resources.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="projects" className="mt-3 animate-fade-in">
                  <ul className="flex flex-col gap-1.5">
                    {phase.projects.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </div>
    </Collapsible>
  )
}
