import { SectionHeading, TestimonialCard } from '@/components/ui-components'
import { testimonials } from '@/data/mockData'

export function TestimonialsSection() {
  // If testimonials isn't in mockData, we'll export it from here or ensure it's in mockData.
  // Actually, I'll provide an empty fallback if missing.
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Success Stories"
          title="Students Love Horizon Guide"
          subtitle="Hear from students who transformed their careers with our platform"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {(testimonials || []).map((testimonial: any) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              domain={testimonial.domain}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
