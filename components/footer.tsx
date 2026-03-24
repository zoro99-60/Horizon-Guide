import Link from "next/link"
import { Compass } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Roadmaps", href: "/roadmaps" },
      { label: "Career Insights", href: "/career-insights" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Career Quiz", href: "/quiz" },
      { label: "Community", href: "/community" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="group flex items-center gap-2 font-bold text-lg w-fit">
              <Compass className="h-5 w-5 text-primary transition-transform duration-500 group-hover:rotate-45" />
              <span className="text-foreground">Horizon</span>
              <span className="text-primary">Guide</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering engineering students to navigate their career paths with personalized roadmaps and expert guidance.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 HorizonGuide. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
