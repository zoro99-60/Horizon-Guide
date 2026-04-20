import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function SaveRoadmapCta() {
  return (
    <Card className="bg-gradient-to-br from-primary/15 via-card to-secondary/15 border-primary/20 mt-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
      <CardContent className="relative p-8 text-center">
        <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-5">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
          Ready to track your progress?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Create a free account to save your roadmap, track skill progress, and get personalized recommendations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/onboarding">
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              Get Started Free
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              View Dashboard
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
