"use client"

import { useEffect, useState } from "react"
import { useStaggerReveal } from "@/hooks/use-animate-on-scroll"
import { testimonials as mockTestimonials } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const { ref, isVisible } = useStaggerReveal({ threshold: 0.1 })
  const [testimonials, setTestimonials] = useState(mockTestimonials)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getTestimonials()
        if (data && data.length > 0) setTestimonials(data)
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
      }
    }
    loadData()
  }, [])

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center animate-fade-up">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Students Say
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hear from students who transformed their career journeys.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 stagger-children"
        >
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className={cn(
                "reveal group relative border bg-card overflow-hidden hover-lift press-effect cursor-default transition-all",
                isVisible && "is-visible"
              )}
              style={{
                animationDelay: `${i * 120}ms`,
              }}
            >
              {/* Gradient accent top border */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardContent className="flex flex-col p-6">
                <Quote className="h-8 w-8 text-primary/20 transition-all duration-300 group-hover:text-primary/40 group-hover:scale-110" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground italic">
                  {`"${t.quote}"`}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary/30 group-hover:scale-110">
                    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                      {t.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.branch}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
