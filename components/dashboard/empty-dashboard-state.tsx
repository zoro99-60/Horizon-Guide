import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NextStepCard } from '@/components/shared/next-step-card'

export function EmptyDashboardState({ profileName }: { profileName: string }) {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold font-heading mb-4">Welcome to Horizon Guide, {profileName}!</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          You haven't saved any roadmaps yet. To get personalized guidance and track your progress, take our career quiz or explore the available roadmaps.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quiz">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              Take the Career Quiz
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Explore Domains
            </Button>
          </Link>
        </div>
      </div>
      
      <NextStepCard
        title="Not sure where to start?"
        description="Our AI-powered career quiz takes just 2 minutes to complete and will recommend the perfect career domain based on your interests and strengths."
        href="/quiz"
        ctaText="Start Quiz"
      />
    </div>
  )
}
