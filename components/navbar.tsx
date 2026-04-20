'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Compass,
  Map as MapIcon,
  ClipboardList,
  LogIn,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  ArrowRight,
  UserCheck,
} from 'lucide-react'
import { getProfile, getSavedRoadmaps, getQuizResult, Profile, SavedRoadmap } from '@/lib/store'

const publicNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore Domains', icon: Compass },
  { href: '/roadmaps', label: 'Roadmaps', icon: MapIcon },
  { href: '/quiz', label: 'Career Quiz', icon: ClipboardList },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([])
  const [recommendedDomainId, setRecommendedDomainId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setProfile(getProfile())
    setSavedRoadmaps(getSavedRoadmaps())
    setRecommendedDomainId(getQuizResult()?.primaryDomain || null)
    setIsMobileMenuOpen(false)
    setIsMounted(true)
  }, [pathname])

  const hasCompletedOnboarding = !!profile?.onboardingComplete
  const hasSavedRoadmap = savedRoadmaps.length > 0

  const primaryCta = useMemo(() => {
    if (!profile) {
      return {
        href: '/onboarding',
        label: 'Get Started',
        icon: null,
      }
    }

    if (!hasCompletedOnboarding) {
      return {
        href: '/onboarding',
        label: 'Complete Setup',
        icon: UserCheck,
      }
    }

    if (hasSavedRoadmap) {
      return {
        href: '/dashboard',
        label: 'Continue Journey',
        icon: LayoutDashboard,
      }
    }

    if (recommendedDomainId) {
      return {
        href: `/roadmaps/${recommendedDomainId}`,
        label: 'View Roadmap',
        icon: ArrowRight,
      }
    }

    return {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    }
  }, [profile, hasCompletedOnboarding, hasSavedRoadmap, recommendedDomainId])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass border-b border-border/50' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-foreground group-hover:text-primary transition-colors">
              Horizon Guide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}

            {hasCompletedOnboarding && (
              <Link
                href="/dashboard"
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname === '/dashboard'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isMounted ? (
              <div className="w-24 h-9" />
            ) : !profile ? (
              <Link href={primaryCta.href}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 glow-primary">
                  {primaryCta.label}
                </Button>
              </Link>
            ) : (
              <Link href={primaryCta.href}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20">
                  {primaryCta.icon && <primaryCta.icon className="h-4 w-4 mr-2" />}
                  {primaryCta.label}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {hasCompletedOnboarding && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    pathname === '/dashboard'
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  Dashboard
                </Link>
              )}

              <div className="flex flex-col gap-2 pt-4 border-t border-border/50 mt-2">
                {!isMounted ? null : !profile ? (
                  <Link href={primaryCta.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {primaryCta.label}
                    </Button>
                  </Link>
                ) : (
                  <Link href={primaryCta.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {primaryCta.icon && <primaryCta.icon className="h-4 w-4 mr-2" />}
                      {primaryCta.label}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}