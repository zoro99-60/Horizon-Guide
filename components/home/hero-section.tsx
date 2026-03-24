import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import BorderGlow from "@/components/ui/BorderGlow"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated blob backgrounds */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="blob absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 bg-primary/10"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="blob blob-delay absolute right-1/4 top-16 h-80 w-80 bg-violet-400/10"
          style={{ animationDuration: "13s" }}
        />
        <div
          className="blob absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 bg-blue-400/8"
          style={{ animationDuration: "15s", animationDelay: "-2s" }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.48 0.2 265 / 0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-16 text-center lg:px-8 lg:pt-28 lg:pb-32">
        {/* Badge */}
        <div className="animate-fade-up delay-75 mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/10">
          <Sparkles className="h-4 w-4 animate-float" style={{ animationDuration: "2.5s" }} />
          Free Career Guidance for Engineering Students
        </div>

        {/* Heading */}
        <h1 className="animate-fade-up delay-150 max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Navigate Your Engineering Career with{" "}
          <span className="bg-gradient-to-r from-primary via-violet-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite] inline-block">
            Confidence
          </span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-up delay-300 mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Get personalized roadmaps, career insights, and expert resources tailored to your
          engineering branch and interests. From first-year to placement-ready.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up delay-400 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <BorderGlow
            animated
            glowColor="270 100% 60%"
            borderRadius={12}
          >
            <Button
              asChild
              size="lg"
              className="group gap-2 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <Link href="/roadmaps">
                Generate My Roadmap
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </BorderGlow>
          
          <BorderGlow
            glowColor="200 100% 60%"
            borderRadius={12}
            fillOpacity={0.2}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base transition-all hover:scale-105 hover:border-primary/40 hover:bg-primary/5 active:scale-95"
            >
              <Link href="/quiz">Take Career Quiz</Link>
            </Button>
          </BorderGlow>
        </div>


        {/* Social proof */}
        <p className="animate-fade-up delay-600 mt-8 text-sm text-muted-foreground">
          Trusted by{" "}
          <span className="font-semibold text-foreground">10,000+</span>{" "}
          engineering students across India
        </p>

        {/* Floating decorative dots */}
        <div className="pointer-events-none absolute right-8 top-24 hidden lg:block">
          <div className="flex flex-col gap-2 animate-float" style={{ animationDuration: "4s" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-2">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-1.5 w-1.5 rounded-full bg-primary/20"
                    style={{ opacity: 0.3 + (i + j) * 0.06 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute left-8 bottom-16 hidden lg:block">
          <div className="flex flex-col gap-2 animate-float" style={{ animationDuration: "5s", animationDelay: "-2s" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-1.5 w-1.5 rounded-full bg-violet-400/30" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
