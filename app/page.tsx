import { HeroSection } from "@/components/home/hero-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { PopularDomains } from "@/components/home/popular-domains"
import { FeaturesSection } from "@/components/home/features-section"
import { StatsSection } from "@/components/home/stats-section"
import { Testimonials } from "@/components/home/testimonials"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <PopularDomains />
      <FeaturesSection />
      <Testimonials />
    </>
  )
}
