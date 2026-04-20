import { SectionHeading, FeatureCard } from '@/components/ui-components'
import { Map, Target, Lightbulb, Award, Users } from 'lucide-react'

export const features = [
  {
    icon: 'Map',
    title: 'Curated Roadmaps',
    description: 'Step-by-step learning paths created by industry experts, tailored to current market demands.',
  },
  {
    icon: 'Target',
    title: 'Skill Tracking',
    description: 'Monitor your progress, track completed skills, and stay motivated with your personal dashboard.',
  },
  {
    icon: 'Lightbulb',
    title: 'Project Ideas',
    description: 'Build a strong portfolio with domain-specific project recommendations graded by difficulty.',
  },
  {
    icon: 'Award',
    title: 'Placement Prep',
    description: 'Get ready for interviews with specialized resources, practice tests, and company-specific guides.',
  },
]

const featureIcons = {
  Map: Map,
  Target: Target,
  Lightbulb: Lightbulb,
  Award: Award,
  Users: Users,
}

export function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-card/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Features"
          title="Everything You Need to Succeed"
          subtitle="Comprehensive tools and resources designed specifically for engineering students"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons] || Map
            return (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={<Icon className="h-7 w-7" />}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
