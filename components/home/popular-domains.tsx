"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { domains as mockDomains } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStaggerReveal } from "@/hooks/use-animate-on-scroll"

export function PopularDomains() {
  const { ref, isVisible } = useStaggerReveal({ threshold: 0.1 })
  const [domains, setDomains] = useState(mockDomains)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getDomains()
        if (data && data.length > 0) {
          // Map icon names back to Lucide components if needed, or just use mock icon logic
          // For now, we'll keep the mock icons but use text data from API
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

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center animate-fade-up reveal is-visible">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore Career Domains
          </h2>
          <p className="mt-3 text-muted-foreground">
            Discover the engineering career path that matches your passion.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children"
        >
          {domains.map((domain) => {
            const Icon = domain.icon
            return (
              <Link key={domain.id} href="/career-insights" className="group">
                <Card
                  className={cn(
                    "reveal h-full cursor-pointer border bg-card transition-all",
                    "hover-lift hover-glow gradient-border press-effect",
                    isVisible && "is-visible"
                  )}
                >
                  <CardContent className="flex flex-col p-6">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                        domain.bgClass
                      )}
                    >
                      <Icon className={cn("h-6 w-6 transition-transform duration-300 group-hover:rotate-6", domain.colorClass)} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{domain.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {domain.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                      <span className="transition-all duration-300 group-hover:mr-1">Explore</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
