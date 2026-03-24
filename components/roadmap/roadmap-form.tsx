"use client"

import { useState } from "react"
import { domains, engineeringBranches } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import BorderGlow from "@/components/ui/BorderGlow"

const experienceLevels = ["Beginner", "Intermediate", "Advanced"]

const allSkills = [
  "Python",
  "JavaScript",
  "C/C++",
  "Java",
  "HTML/CSS",
  "SQL",
  "Git",
  "React",
  "Data Structures",
  "Mathematics",
  "Linux",
  "Machine Learning Basics",
]

interface RoadmapFormProps {
  onGenerate: (data: {
    branch: string
    domain: string
    skills: string[]
    level: string
  }) => void
  isGenerating: boolean
}

export function RoadmapForm({ onGenerate, isGenerating }: RoadmapFormProps) {
  const [branch, setBranch] = useState("")
  const [domain, setDomain] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [level, setLevel] = useState("Beginner")

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    )
  }

  const canGenerate = branch && domain && level

  return (
    <Card className="border bg-card animate-fade-up">
      <CardHeader>
        <CardTitle className="text-xl">Configure Your Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Branch */}
        <div className="flex flex-col gap-2 animate-fade-up delay-75">
          <Label htmlFor="branch">Engineering Branch</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger
              id="branch"
              className="transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <SelectValue placeholder="Select your branch" />
            </SelectTrigger>
            <SelectContent>
              {engineeringBranches.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Domain */}
        <div className="flex flex-col gap-2 animate-fade-up delay-150">
          <Label htmlFor="domain">Domain of Interest</Label>
          <Select value={domain} onValueChange={setDomain}>
            <SelectTrigger
              id="domain"
              className="transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <SelectValue placeholder="Select a domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-3 animate-fade-up delay-200">
          <Label>Current Skills <span className="text-muted-foreground text-xs font-normal">(optional)</span></Label>
          <div className="grid grid-cols-2 gap-2">
            {allSkills.map((skill) => {
              const checked = selectedSkills.includes(skill)
              return (
                <label
                  key={skill}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all duration-200 hover:bg-accent",
                    checked
                      ? "border-primary/40 bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <span>{skill}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Experience Level */}
        <div className="flex flex-col gap-3 animate-fade-up delay-300">
          <Label>Experience Level</Label>
          <RadioGroup value={level} onValueChange={setLevel}>
            {experienceLevels.map((l) => {
              const isSelected = level === l
              return (
                <label
                  key={l}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-all duration-200",
                    isSelected
                      ? "border-primary/40 bg-primary/5 text-primary"
                      : "border-border hover:bg-accent hover:border-primary/30"
                  )}
                >
                  <RadioGroupItem value={l} />
                  <span className="text-sm font-medium">{l}</span>
                </label>
              )
            })}
          </RadioGroup>
        </div>

        {/* Submit */}
        <div className="flex justify-center animate-fade-up delay-400">
          <BorderGlow
            animated={isGenerating}
            glowColor="270 100% 60%"
            glowIntensity={1.2}
            borderRadius={12}
          >
            <Button
              size="lg"
              className={cn(
                "gap-2 transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]",
                isGenerating && "animate-pulse"
              )}
              disabled={!canGenerate || isGenerating}
              onClick={() => onGenerate({ branch, domain, skills: selectedSkills, level })}
            >
              <Sparkles className={cn("h-4 w-4", isGenerating && "animate-spin")} />
              {isGenerating ? "Generating..." : "Generate Roadmap"}
            </Button>
          </BorderGlow>
        </div>

      </CardContent>
    </Card>
  )
}
