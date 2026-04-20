import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Star, Users, Briefcase } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 tracking-tight">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of engineering students who are building successful careers with Horizon Guide.
          Your placement success story starts today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quiz">
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 text-base px-8 h-14">
              Take the Career Quiz
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button size="lg" variant="outline" className="text-base px-8 h-14">
              Create Free Account
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span>4.9/5 rating</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>10,000+ students</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>500+ placements</span>
          </div>
        </div>
      </div>
    </section>
  )
}
