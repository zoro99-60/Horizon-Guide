import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

import { HeroSection } from '@/components/home/hero-section'
import { StatsSection } from '@/components/home/stats-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { FeaturesSection } from '@/components/home/features-section'
import { DomainsSection } from '@/components/home/domains-section'
import { JourneySection } from '@/components/home/journey-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { CtaSection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DomainsSection />
      <JourneySection />
      <TestimonialsSection />
      <CtaSection />

      <Footer />
    </div>
  )
}
