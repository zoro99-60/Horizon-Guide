import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lightbulb, Zap } from 'lucide-react'

interface NextStepCardProps {
  title: string
  description: string
  href: string
  ctaText: string
  icon?: React.ReactNode
}

export function NextStepCard({ title, description, href, ctaText, icon }: NextStepCardProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/15 via-card to-secondary/10 border-primary/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
      <CardContent className="relative p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            {icon || <Zap className="h-6 w-6 text-primary" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="h-4 w-4 text-warning" />
              <p className="text-sm font-medium text-warning">Next Best Step</p>
            </div>
            <h3 className="text-xl font-bold font-heading text-foreground mb-1">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <Link href={href} className="flex-shrink-0">
          <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            {ctaText}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
