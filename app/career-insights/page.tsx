"use client"

import { useEffect, useState } from "react"
import { domains as mockDomains } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { DomainCard } from "@/components/insights/domain-card"
import { DomainDetail } from "@/components/insights/domain-detail"
import { DomainCompare } from "@/components/insights/domain-compare"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight } from "lucide-react"

export default function CareerInsightsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>(mockDomains[0]?.id || "ai-ml")
  const [domains, setDomains] = useState(mockDomains)
  const [compareA, setCompareA] = useState<string>("")
  const [compareB, setCompareB] = useState<string>("")

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getDomains()
        if (data && data.length > 0) {
          const merged = mockDomains.map(md => {
            const apiD = data.find(d => d.id === md.id)
            return apiD ? { ...md, ...apiD, icon: md.icon } : md
          })
          setDomains(merged)
        }
      } catch (error) {
        console.error("Failed to fetch domains:", error)
      }
    }
    loadData()
  }, [])

  const activeDomain = selectedDomain
    ? domains.find((d) => d.id === selectedDomain)
    : null

  const domainA = compareA ? domains.find((d) => d.id === compareA) : null
  const domainB = compareB ? domains.find((d) => d.id === compareB) : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Career Insights
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore domains, compare career paths, and find your ideal engineering career.
        </p>
      </div>

      <Tabs defaultValue="explore" className="w-full">
        <TabsList>
          <TabsTrigger value="explore">Explore Domains</TabsTrigger>
          <TabsTrigger value="compare" className="gap-1.5">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            Compare
          </TabsTrigger>
        </TabsList>

        {/* Explore Tab */}
        <TabsContent value="explore" className="mt-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Domain list */}
            <div className="flex flex-col gap-3 lg:col-span-2 stagger-children">
              {domains.map((domain) => (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  isSelected={selectedDomain === domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                />
              ))}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-3">
              {activeDomain ? (
                <DomainDetail domain={activeDomain} />
              ) : (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    Select a Domain
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Click on any domain card to view detailed career insights, required skills, job roles, and salary information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Compare Tab */}
        <TabsContent value="compare" className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Domain A</label>
                <Select value={compareA} onValueChange={setCompareA}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select first domain" />
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

              <ArrowLeftRight className="hidden h-5 w-5 text-muted-foreground sm:block" />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Domain B</label>
                <Select value={compareB} onValueChange={setCompareB}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select second domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains
                      .filter((d) => d.id !== compareA)
                      .map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {domainA && domainB ? (
              <DomainCompare domainA={domainA} domainB={domainB} />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                <ArrowLeftRight className="h-8 w-8 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Compare Two Domains
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Select two different domains above to see a side-by-side comparison of skills, roles, and salary ranges.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
