"use client"

import { useEffect, useState } from "react"
import { features as mockFeatures } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useStaggerReveal } from "@/hooks/use-animate-on-scroll"

import { useTheme } from "next-themes"
import MagicBento from "@/components/ui/MagicBento"

export function FeaturesSection() {
  const { theme, resolvedTheme } = useTheme()
  const { ref, isVisible } = useStaggerReveal({ threshold: 0.1 })
  const [features, setFeatures] = useState(mockFeatures)
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getFeatures()
        if (data && data.length > 0) {
          const merged = mockFeatures.map(mf => {
            const apiF = data.find(d => d.title === mf.title)
            return apiF ? { ...mf, ...apiF, icon: mf.icon } : mf
          })
          setFeatures(merged)
        }
      } catch (error) {
        console.error("Failed to fetch features:", error)
      }
    }
    loadData()
  }, [])

  const bentoData = features.map(f => ({
    title: f.title,
    description: f.description,
    label: "Feature",
    icon: f.icon,
    color: "#0c0616"
  }))

  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-muted/10 dark:from-background dark:to-background" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center animate-fade-up">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tools and resources designed specifically for engineering students.
          </p>
        </div>

        <div className="mt-12">
          {isDark ? (
            <MagicBento 
              data={bentoData}
              glowColor="160, 100, 255"
              enableStars={true}
              enableTilt={true}
              enableMagnetism={true}
            />
          ) : (
            <div
              ref={ref}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children"
            >
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.title}
                    className={cn(
                      "reveal group border bg-card shadow-sm hover-lift press-effect cursor-default transition-all",
                      isVisible && "is-visible"
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                      {/* Bottom accent line */}
                      <div className="mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary/60 to-primary/20 transition-all duration-500 group-hover:w-full" />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

