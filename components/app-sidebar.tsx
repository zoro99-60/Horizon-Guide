'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Map,
  Calendar,
  Target,
  Compass,
  Building2,
  BookOpen,
  Lightbulb,
  FileText,
  Users,
  User,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
  Shield,
  BarChart3,
  ClipboardList,
  MessageSquare,
  Zap,
  Trophy,
  Flame,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { type LucideIcon } from 'lucide-react'
import { getProfile } from '@/lib/store'

type LinkItem = {
  href: string
  label: string
  icon: LucideIcon
  description: string
  badge?: string
}

type LinkGroup = {
  group: string
  items: LinkItem[]
}

const studentLinks: LinkGroup[] = [
  { 
    group: 'Main',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Your command center' },
      { href: '/roadmaps', label: 'Career Roadmap', icon: Map, description: 'Your learning path', badge: 'Active' },
    ]
  },
  {
    group: 'Learning',
    items: [
      { href: '/dashboard/planner', label: 'Year Planner', icon: Calendar, description: 'Plan your journey' },
      { href: '/dashboard/skills', label: 'Skill Tracker', icon: Target, description: 'Track progress' },
      { href: '/explore', label: 'Explore Domains', icon: Compass, description: 'Discover paths' },
    ]
  },
  {
    group: 'Career',
    items: [
      { href: '/dashboard/companies', label: 'Companies', icon: Building2, description: 'Target companies' },
      { href: '/dashboard/prep', label: 'Placement Prep', icon: FileText, description: 'Interview ready', badge: 'New' },
    ]
  },
  {
    group: 'Resources',
    items: [
      { href: '/dashboard/resources', label: 'Learning Hub', icon: BookOpen, description: 'Curated resources' },
      { href: '/dashboard/projects', label: 'Project Ideas', icon: Lightbulb, description: 'Build projects' },
      { href: '/dashboard/community', label: 'Community', icon: Users, description: 'Connect with peers' },
    ]
  },
]

const facultyLinks: LinkGroup[] = [
  {
    group: 'Overview',
    items: [
      { href: '/faculty', label: 'Dashboard', icon: LayoutDashboard, description: 'Faculty overview' },
      { href: '/faculty#analytics', label: 'Analytics', icon: BarChart3, description: 'Track metrics' },
    ]
  },
  {
    group: 'Students',
    items: [
      { href: '/faculty#students', label: 'Student Progress', icon: GraduationCap, description: 'Monitor students' },
      { href: '/faculty#mentoring', label: 'Mentoring', icon: MessageSquare, description: 'Guide students' },
    ]
  },
  {
    group: 'Settings',
    items: [
      { href: '/faculty#settings', label: 'Settings', icon: Settings, description: 'Preferences' },
    ]
  },
]

const adminLinks: LinkGroup[] = [
  {
    group: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, description: 'Admin overview' },
      { href: '/admin#analytics', label: 'Analytics', icon: BarChart3, description: 'Platform metrics' },
    ]
  },
  {
    group: 'Content',
    items: [
      { href: '/admin#domains', label: 'Manage Domains', icon: Compass, description: 'Domain settings' },
      { href: '/admin#companies', label: 'Manage Companies', icon: Building2, description: 'Company data' },
      { href: '/admin#resources', label: 'Manage Resources', icon: BookOpen, description: 'Resource library' },
      { href: '/admin#projects', label: 'Manage Projects', icon: Lightbulb, description: 'Project ideas' },
    ]
  },
  {
    group: 'Moderation',
    items: [
      { href: '/admin#community', label: 'Community', icon: Users, description: 'Moderate content' },
      { href: '/admin#reports', label: 'Reports', icon: ClipboardList, description: 'Review reports' },
    ]
  },
  {
    group: 'Settings',
    items: [
      { href: '/admin#settings', label: 'Settings', icon: Settings, description: 'Platform settings' },
    ]
  },
]

interface AppSidebarProps {
  variant?: 'student' | 'faculty' | 'admin'
}

export function AppSidebar({ variant = 'student' }: AppSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [streakDays, setStreakDays] = useState(7)
  const [profileName, setProfileName] = useState('Student')
  const [profileMeta, setProfileMeta] = useState('')

  useEffect(() => {
    const profile = getProfile()
    if (profile) {
      setProfileName(profile.name || 'Student')
      const y = profile.year ? Number(profile.year) : null
      const yearStr = y ? `${y}${y === 1 ? 'st' : y === 2 ? 'nd' : y === 3 ? 'rd' : 'th'} Year` : ''
      const branch = profile.branch || ''
      setProfileMeta([yearStr, branch].filter(Boolean).join(' \u2022 '))
    }
  }, [pathname])

  const linkGroups =
    variant === 'faculty'
      ? facultyLinks
      : variant === 'admin'
      ? adminLinks
      : studentLinks

  const roleConfig = {
    student: { label: 'Student', icon: GraduationCap, color: 'bg-primary/20 text-primary' },
    faculty: { label: 'Faculty', icon: BookOpen, color: 'bg-secondary/20 text-secondary' },
    admin: { label: 'Admin', icon: Shield, color: 'bg-warning/20 text-warning' },
  }

  const currentRole = roleConfig[variant]
  const RoleIcon = currentRole.icon

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col',
        isCollapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border flex-shrink-0">
        <Link href="/" className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary flex-shrink-0 shadow-sm shadow-primary/20">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold font-heading tracking-tight text-sidebar-foreground">
              Horizon
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors',
            isCollapsed && 'absolute -right-3 top-5 bg-sidebar border border-sidebar-border shadow-sm z-50'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Role Badge & Quick Stats */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className={cn('flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium', currentRole.color)}>
              <RoleIcon className="h-3.5 w-3.5" />
              {currentRole.label}
            </div>
            {variant === 'student' && (
              <div className="flex items-center gap-1.5 text-warning">
                <Flame className="h-4 w-4" />
                <span className="text-xs font-semibold">{streakDays}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {linkGroups.map((group, groupIndex) => (
          <div key={group.group} className={cn(groupIndex > 0 && 'mt-5')}>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {group.group}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group relative',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent',
                      isCollapsed && 'justify-center px-2'
                    )}
                    title={isCollapsed ? link.label : undefined}
                  >
                    <Icon className={cn(
                      'h-[18px] w-[18px] flex-shrink-0 transition-transform',
                      isActive && 'text-current',
                      !isActive && 'group-hover:scale-105'
                    )} />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium flex-1">{link.label}</span>
                        {link.badge && (
                          <Badge 
                            className={cn(
                              'text-[10px] px-1.5 py-0 h-4 border-0',
                              link.badge === 'New' && 'bg-success/20 text-success',
                              link.badge === 'Active' && 'bg-primary/20 text-primary'
                            )}
                          >
                            {link.badge}
                          </Badge>
                        )}
                      </>
                    )}
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground/30 rounded-r-full" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3 flex-shrink-0 space-y-2">
        {/* Quick Actions */}
        {!isCollapsed && variant === 'student' && (
          <div className="flex items-center gap-1 mb-3 px-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Help"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* User Profile */}
        <Link
          href="/dashboard/profile"
          className={cn(
            'flex items-center gap-3 rounded-xl p-2.5 hover:bg-sidebar-accent transition-colors group',
            isCollapsed && 'justify-center'
          )}
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center flex-shrink-0 ring-2 ring-sidebar-accent">
            <User className="h-4 w-4 text-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate group-hover:text-primary transition-colors">
                {profileName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {profileMeta || 'Student'}
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  )
}
