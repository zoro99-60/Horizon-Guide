import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ClipboardList, Sparkles, CheckCircle2 } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm bg-primary/10 border-primary/20 text-primary">
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            Built for Engineering Students
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-foreground leading-[1.1] mb-8 tracking-tight">
            Your Career Roadmap from{' '}
            <span className="gradient-text">First Year to Placement</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
            A comprehensive career development platform for engineering students. 
            Discover your domain, build real skills, and get placement-ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/onboarding">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 text-base px-8 h-14 text-lg">
                <ClipboardList className="h-5 w-5 mr-2" />
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="text-base px-8 h-14 text-lg border-border/80 hover:bg-muted/50">
                Explore Domains
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>7+ Career domains</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Curated roadmaps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Progress tracking</span>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
