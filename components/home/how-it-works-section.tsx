import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui-components'
import { Target, Map, Lightbulb, Award, ArrowRight } from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Discover',
    description: 'Take our AI-powered career quiz to find the perfect domain that matches your interests and strengths.',
    icon: Target,
    color: 'primary',
  },
  {
    step: '02',
    title: 'Plan',
    description: 'Get a personalized roadmap with skills, projects, and resources tailored to your career goals.',
    icon: Map,
    color: 'secondary',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Learn systematically, create impressive projects, and track your progress with smart insights.',
    icon: Lightbulb,
    color: 'warning',
  },
  {
    step: '04',
    title: 'Achieve',
    description: 'Become placement-ready with a strong portfolio, polished skills, and interview preparation.',
    icon: Award,
    color: 'success',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="From Confused to Confident"
          subtitle="A clear 4-step process that takes you from career uncertainty to placement success"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={step.step}
                className="bg-card/80 backdrop-blur-sm border-border/50 relative overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <CardContent className="p-7">
                  <div className="absolute top-4 right-4 text-7xl font-bold text-muted/10 font-heading select-none">
                    {step.step}
                  </div>
                  
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                    step.color === 'primary' ? 'bg-primary/10 text-primary' :
                    step.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                    step.color === 'warning' ? 'bg-warning/10 text-warning' :
                    'bg-success/10 text-success'
                  }`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-border z-10" />
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
