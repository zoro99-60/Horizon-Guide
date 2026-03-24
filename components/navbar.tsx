"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Compass, Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import BorderGlow from "@/components/ui/BorderGlow"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/career-insights", label: "Career Insights" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/quiz", label: "Quiz" },
  { href: "/community", label: "Community" },
]

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Check auth status
    const getInitialUser = async () => {
        try {
            const { createClient } = await import("@/utils/supabase/client")
            const supabase = createClient()
            const { data: { user: foundUser } } = await supabase.auth.getUser()
            setUser(foundUser)
        } catch (err) {
            console.error("Error fetching user:", err)
        } finally {
            setIsLoading(false)
        }
    }

    getInitialUser()

    const setupAuth = async () => {
        const { createClient } = await import("@/utils/supabase/client")
        const supabase = createClient()
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })
        return subscription
    }

    const subscriptionPromise = setupAuth()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      subscriptionPromise.then(sub => sub.unsubscribe())
    }
  }, [])

  const handleLogout = async () => {
    const { createClient } = await import("@/utils/supabase/client")
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm shadow-black/5 backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 font-sans font-bold text-xl tracking-tight transition-opacity hover:opacity-80"
        >
          <Compass className="h-6 w-6 text-primary transition-transform duration-500 group-hover:rotate-45" />
          <span className="text-foreground">Horizon</span>
          <span className="text-primary">Guide</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "animated-underline relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary active"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary animate-scale-in" />
                )}
              </Link>
            )
          })}
        </div>


        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Button variant="ghost" size="sm" className="hidden md:inline-flex hover:text-primary gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                  <BorderGlow
                    glowColor="270 100% 60%"
                    borderRadius={8}
                    className="hidden md:inline-block"
                  >
                    <Button asChild size="sm" className="gap-1.5 transition-transform hover:scale-105 active:scale-95 px-5">
                      <Link href="/dashboard" className="gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                  </BorderGlow>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex hover:text-primary">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <BorderGlow
                    glowColor="270 100% 60%"
                    borderRadius={8}
                    className="hidden md:inline-block"
                  >
                    <Button asChild size="sm" className="gap-1.5 transition-transform hover:scale-105 active:scale-95">
                      <Link href="/auth/register">Get Started</Link>
                    </Button>
                  </BorderGlow>
                </>
              )}
            </>
          )}



          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden transition-transform hover:scale-110 active:scale-95"
                aria-label="Open menu"
              >
                <span className={cn("transition-all duration-300", open ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100")}>
                  <Menu className="h-5 w-5" />
                </span>
                <span className={cn("transition-all duration-300", !open ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100")}>
                  <X className="h-5 w-5" />
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 animate-fade-left">
              <SheetTitle className="flex items-center gap-2 font-bold text-lg">
                <Compass className="h-5 w-5 text-primary" />
                HorizonGuide
              </SheetTitle>
              <div className="mt-6 flex flex-col gap-1 stagger-children">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "reveal is-visible rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Button asChild className="mt-4 transition-transform hover:scale-105 active:scale-95">
                      <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button variant="outline" className="mt-2 transition-transform hover:scale-105 active:scale-95 gap-2" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button asChild className="mt-4 transition-transform hover:scale-105 active:scale-95">
                    <Link href="/auth/register" onClick={() => setOpen(false)}>Get Started</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
