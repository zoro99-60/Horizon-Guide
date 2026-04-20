import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui-components'
import { CheckCircle2, GraduationCap } from 'lucide-react'

const yearJourney = [
  { 
    year: '1st Year', 
    focus: 'Foundation Building', 
    items: ['Programming fundamentals', 'Domain exploration', 'First mini-projects'],
    highlight: 'Start your journey'
  },
  { 
    year: '2nd Year', 
    focus: 'Domain Selection', 
    items: ['Choose career path', 'Begin roadmap', 'Apply for internships'],
    highlight: 'Find your direction'
  },
  { 
    year: '3rd Year', 
    focus: 'Deep Specialization', 
    items: ['Advanced skills', 'Major projects', 'Secure internship'],
    highlight: 'Build expertise'
  },
  { 
    year: '4th Year', 
    focus: 'Placement Ready', 
    items: ['Interview prep', 'Portfolio polish', 'Land your dream job'],
    highlight: 'Achieve success'
  },
]

export function JourneySection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background via-card/50 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Your Journey"
          title="Structured Guidance, Year by Year"
          subtitle="Horizon Guide provides personalized guidance from your first day to final placement"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {yearJourney.map((yearData, index) => (
            <Card
              key={yearData.year}
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              {index < 3 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-border to-transparent z-10" />
              )}
              
              <CardContent className="p-6 lg:p-7">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <GraduationCap className="h-3 w-3 mr-1.5" />
                  {yearData.year}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  {yearData.focus}
                </h3>
                <p className="text-xs text-primary mb-4">{yearData.highlight}</p>
                <ul className="space-y-2.5">
                  {yearData.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
