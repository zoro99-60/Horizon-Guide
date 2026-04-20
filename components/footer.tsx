import Link from 'next/link'
import { Sparkles, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Explore Domains', href: '/explore' },
    { label: 'Career Roadmaps', href: '/roadmaps' },
    { label: 'Career Quiz', href: '/quiz' },
    { label: 'Learning Resources', href: '/dashboard/resources' },
    { label: 'Project Ideas', href: '/dashboard/projects' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'For Faculty', href: '/faculty' },
    { label: 'For Administrators', href: '/admin' },
    { label: 'Success Stories', href: '/about#testimonials' },
    { label: 'Contact', href: '/about#contact' },
  ],
  resources: [
    { label: 'Community', href: '/dashboard/community' },
    { label: 'Placement Prep', href: '/dashboard/prep' },
    { label: 'Skill Tracker', href: '/dashboard/skills' },
    { label: 'Year-wise Planner', href: '/dashboard/planner' },
    { label: 'Help Center', href: '/help' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold font-heading tracking-tight">
                  Horizon Guide
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
                Your comprehensive career development platform for engineering students. 
                From 1st year to placement, we guide you every step of the way.
              </p>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>support@horizonguide.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Engineering College Campus</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2024 Horizon Guide. Built for engineering students.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
