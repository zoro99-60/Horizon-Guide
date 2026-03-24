"use client"

import { useState } from "react"
import { domains, roadmapTemplates, companiesByDomain } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { RoadmapForm } from "@/components/roadmap/roadmap-form"
import { RoadmapDisplay } from "@/components/roadmap/roadmap-display"
import { CompanyRoles } from "@/components/roadmap/company-roles"
import { ResumeGenerator } from "@/components/roadmap/resume-generator"
import { Map, ArrowRight } from "lucide-react"

interface FormData {
  branch: string
  domain: string
  skills: string[]
  level: string
}

export default function RoadmapsPage() {
  const [phases, setPhases] = useState<any[] | null>(null)
  const [companies, setCompanies] = useState<any[]>([])
  const [domainInfo, setDomainInfo] = useState<any | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (data: FormData) => {
    setIsGenerating(true)
    setFormData(data)

    try {
      const selectedDomain = domains.find((d) => d.id === data.domain)
      setDomainInfo(selectedDomain || null)

      const [roadmapRes, companiesRes] = await Promise.all([
        api.getRoadmap(data.domain),
        api.getCompanies(data.domain)
      ])

      let finalPhases = roadmapRes?.phases || roadmapTemplates[data.domain] || null
      let finalCompanies = (companiesRes && companiesRes.length > 0) ? companiesRes : (companiesByDomain[data.domain] || [])

      setPhases(finalPhases)
      setCompanies(finalCompanies)

      // Save to Supabase
      if (finalPhases) {
        const { createClient } = await import("@/utils/supabase/client")
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          await supabase.from("roadmaps").insert({
            user_id: user.id,
            title: selectedDomain?.title || data.domain,
            steps: finalPhases,
            status: 'active'
          })
        }
      }

    } catch (error) {
      console.error("Failed to generate roadmap from API:", error)
      const fallbackPhases = roadmapTemplates[data.domain] || null
      setPhases(fallbackPhases)
      setCompanies(companiesByDomain[data.domain] || [])
      setDomainInfo(domains.find((d) => d.id === data.domain) || null)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Roadmap Generator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Configure your preferences and get a personalized, phase-by-phase career roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left Panel: Form */}
        <div className="lg:col-span-2">
          <RoadmapForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Right Panel: Result */}
        <div className="lg:col-span-3">
          {phases && domainInfo && formData ? (
            <div className="flex flex-col gap-8">
              <RoadmapDisplay phases={phases} domainTitle={domainInfo.title} />
              {companies.length > 0 && (
                <CompanyRoles companies={companies} domainTitle={domainInfo.title} />
              )}
              <ResumeGenerator
                phases={phases}
                domainInfo={domainInfo}
                userSkills={formData.skills}
                userLevel={formData.level}
                userBranch={formData.branch}
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {isGenerating ? "Generating your roadmap..." : "Your Roadmap Will Appear Here"}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {isGenerating
                  ? "Analyzing your preferences and creating a personalized learning path."
                  : "Fill out the form on the left and click \"Generate Roadmap\" to get your personalized career path."}
              </p>
              {!isGenerating && (
                <div className="mt-4 flex items-center gap-1 text-sm text-primary">
                  <ArrowRight className="h-4 w-4 rotate-180 lg:rotate-0" />
                  <span className="hidden lg:inline">Start by selecting your branch</span>
                  <span className="lg:hidden">Start by selecting your branch above</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
