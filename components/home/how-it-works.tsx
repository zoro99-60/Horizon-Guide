"use client"

import { useEffect, useState } from "react"
import { howItWorks as mockHowItWorks } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { Card, CardContent } from "@/components/ui/card"
import { useStaggerReveal } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

export function HowItWorks() {
  const { ref, isVisible } = useStaggerReveal({ threshold: 0.1 })
  const [items, setItems] = useState(mockHowItWorks)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getHowItWorks()
        if (data && data.length > 0) {
          const merged = mockHowItWorks.map(mi => {
            const apiI = data.find(d => d.step === mi.step)
            return apiI ? { ...mi, ...apiI, icon: mi.icon } : mi
          })
          setItems(merged)
        }
      } catch (error) {
        console.error("Failed to fetch how it works:", error)
      }
    }
    loadData()
  }, [])

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle BG */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center reveal is-visible animate-fade-up">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Four simple steps to kickstart your career journey.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children"
        >
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute top-[60px] left-[12.5%] hidden w-3/4 lg:block">
            <div
              className={cn(
                "h-px origin-left bg-gradient-to-r from-primary/40 via-primary/30 to-primary/40 transition-all duration-1000",
                isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              )}
              style={{ transitionDelay: "0.3s" }}
            />
          </div>

          {items.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.step}
                className={cn(
                  "group reveal relative border bg-card shadow-sm hover-lift hover-glow press-effect cursor-default transition-all",
                  isVisible && "is-visible"
                )}
              >
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6" />
                    {/* Step badge */}
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
