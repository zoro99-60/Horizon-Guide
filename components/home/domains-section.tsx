import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionHeading, DomainCard } from '@/components/ui-components'
import { ArrowRight } from 'lucide-react'
import { domains } from '@/data/mockData'

export function DomainsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Career Paths"
          title="Explore Career Domains"
          subtitle="Find the perfect career path that matches your interests, skills, and aspirations"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {domains.slice(0, 8).map((domain) => (
            <DomainCard
              key={domain.id}
              id={domain.id}
              name={domain.name}
              icon={domain.icon}
              color={domain.color}
              description={domain.description}
              difficulty={domain.difficulty}
              demand={domain.demand}
              skills={domain.skills}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/explore">
            <Button variant="outline" size="lg" className="px-8">
              View All Domains
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
