'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Trophy,
  Target,
  Zap,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  Info,
  BookOpen,
  GraduationCap,
  Shield,
  Users,
  Building2,
  FileSearch,
  Inbox,
  FolderOpen,
  Search,
  PlusCircle,
} from 'lucide-react'

// ============================================================================
// PAGE HEADER - Consistent page headers with breadcrumb and actions
// ============================================================================
interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: { label: string; href?: string }[]
  badge?: { label: string; variant?: 'default' | 'success' | 'warning' | 'info' }
  icon?: ReactNode
  actions?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  badge,
  icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('mb-8', className)}>
      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          {breadcrumb.map((item, index) => (
            <span key={item.label} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary flex-shrink-0">
              {icon}
            </div>
          )}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl lg:text-3xl font-bold font-heading text-foreground tracking-tight">
                {title}
              </h1>
              {badge && (
                <Badge
                  className={cn(
                    'border-0',
                    badge.variant === 'success' && 'bg-success/20 text-success',
                    badge.variant === 'warning' && 'bg-warning/20 text-warning',
                    badge.variant === 'info' && 'bg-primary/20 text-primary',
                    (!badge.variant || badge.variant === 'default') && 'bg-muted text-muted-foreground'
                  )}
                >
                  {badge.label}
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  )
}

// ============================================================================
// EMPTY STATE - Polished empty states for all content types
// ============================================================================
interface EmptyStateProps {
  icon?: 'inbox' | 'folder' | 'search' | 'file' | 'users' | 'building' | 'book'
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
}

const emptyStateIcons = {
  inbox: Inbox,
  folder: FolderOpen,
  search: FileSearch,
  file: Search,
  users: Users,
  building: Building2,
  book: BookOpen,
}

export function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const IconComponent = emptyStateIcons[icon]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className
      )}
    >
      <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
        <IconComponent className="h-8 w-8 text-muted-foreground/70" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
        {title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            action.href ? (
              <Link href={action.href}>
                <Button className="bg-primary hover:bg-primary/90">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              </Link>
            ) : (
              <Button onClick={action.onClick} className="bg-primary hover:bg-primary/90">
                <PlusCircle className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link href={secondaryAction.href}>
                <Button variant="outline">{secondaryAction.label}</Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// ACTION CARD - Clear "what to do next" guidance
// ============================================================================
interface ActionCardProps {
  title: string
  description: string
  action: {
    label: string
    href: string
  }
  icon: ReactNode
  priority?: 'high' | 'medium' | 'low'
  badge?: string
  progress?: number
  className?: string
}

export function ActionCard({
  title,
  description,
  action,
  icon,
  priority = 'medium',
  badge,
  progress,
  className,
}: ActionCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group',
        priority === 'high' &&
          'bg-gradient-to-br from-primary/10 via-card to-secondary/5 border-primary/30',
        priority === 'medium' && 'bg-card border-border/50 hover:border-primary/40',
        priority === 'low' && 'bg-card/80 border-border/40 hover:border-border',
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0',
              priority === 'high' &&
                'bg-gradient-to-br from-primary/30 to-primary/10 text-primary',
              priority === 'medium' && 'bg-primary/10 text-primary',
              priority === 'low' && 'bg-muted text-muted-foreground'
            )}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors font-heading">
                {title}
              </h3>
              {badge && (
                <Badge
                  className={cn(
                    'text-xs border-0',
                    priority === 'high' && 'bg-primary/20 text-primary',
                    priority !== 'high' && 'bg-muted text-muted-foreground'
                  )}
                >
                  {badge}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {description}
            </p>
            {progress !== undefined && (
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {progress}%
                </span>
              </div>
            )}
            <Link href={action.href}>
              <Button
                size="sm"
                variant={priority === 'high' ? 'default' : 'outline'}
                className={cn(
                  priority === 'high' && 'bg-primary hover:bg-primary/90'
                )}
              >
                {action.label}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
      {priority === 'high' && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
      )}
    </Card>
  )
}

// ============================================================================
// SECTION CARD - Grouping content with consistent styling
// ============================================================================
interface SectionCardProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: {
    label: string
    href: string
  }
  badge?: string
  children: ReactNode
  className?: string
}

export function SectionCard({
  title,
  description,
  icon,
  action,
  badge,
  children,
  className,
}: SectionCardProps) {
  return (
    <Card
      className={cn(
        'bg-card/80 backdrop-blur-sm border-border/50',
        className
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-heading">{title}</CardTitle>
                {badge && (
                  <Badge variant="secondary" className="bg-muted/50 text-xs">
                    {badge}
                  </Badge>
                )}
              </div>
              {description && (
                <CardDescription className="mt-0.5">{description}</CardDescription>
              )}
            </div>
          </div>
          {action && (
            <Link href={action.href}>
              <Button variant="ghost" size="sm" className="text-primary">
                {action.label}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

// ============================================================================
// ALERT BANNER - Important notices and guidance
// ============================================================================
interface AlertBannerProps {
  title: string
  description: string
  variant?: 'info' | 'success' | 'warning' | 'error'
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function AlertBanner({
  title,
  description,
  variant = 'info',
  action,
  dismissible,
  onDismiss,
  className,
}: AlertBannerProps) {
  const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    error: AlertCircle,
  }
  const Icon = icons[variant]

  return (
    <div
      className={cn(
        'relative rounded-xl p-4 flex items-start gap-4',
        variant === 'info' && 'bg-primary/10 border border-primary/20',
        variant === 'success' && 'bg-success/10 border border-success/20',
        variant === 'warning' && 'bg-warning/10 border border-warning/20',
        variant === 'error' && 'bg-destructive/10 border border-destructive/20',
        className
      )}
    >
      <div
        className={cn(
          'h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0',
          variant === 'info' && 'bg-primary/20 text-primary',
          variant === 'success' && 'bg-success/20 text-success',
          variant === 'warning' && 'bg-warning/20 text-warning',
          variant === 'error' && 'bg-destructive/20 text-destructive'
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground mb-0.5">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        {action && (
          <div className="mt-3">
            {action.href ? (
              <Link href={action.href}>
                <Button size="sm" variant="outline" className="h-8">
                  {action.label}
                  <ArrowRight className="h-3.5 w-3.5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                onClick={action.onClick}
              >
                {action.label}
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

// ============================================================================
// QUICK STATS ROW - Compact stats display
// ============================================================================
interface QuickStat {
  label: string
  value: string | number
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' }
  icon?: ReactNode
}

interface QuickStatsRowProps {
  stats: QuickStat[]
  className?: string
}

export function QuickStatsRow({ stats, className }: QuickStatsRowProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-6 p-4 rounded-xl bg-muted/30 border border-border/50',
        className
      )}
    >
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center gap-3">
          {stat.icon && (
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {stat.icon}
            </div>
          )}
          <div>
            <p className="text-xl font-bold text-foreground font-heading">
              {stat.value}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              {stat.trend && (
                <span
                  className={cn(
                    'text-xs font-medium flex items-center gap-0.5',
                    stat.trend.direction === 'up' && 'text-success',
                    stat.trend.direction === 'down' && 'text-destructive',
                    stat.trend.direction === 'neutral' && 'text-muted-foreground'
                  )}
                >
                  <TrendingUp
                    className={cn(
                      'h-3 w-3',
                      stat.trend.direction === 'down' && 'rotate-180'
                    )}
                  />
                  {stat.trend.value}
                </span>
              )}
            </div>
          </div>
          {index < stats.length - 1 && (
            <div className="w-px h-10 bg-border/50 ml-3 hidden sm:block" />
          )}
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// PROGRESS TRACKER - Visual timeline progress
// ============================================================================
interface ProgressStep {
  label: string
  status: 'completed' | 'current' | 'upcoming' | 'locked'
  description?: string
}

interface ProgressTrackerProps {
  steps: ProgressStep[]
  className?: string
}

export function ProgressTracker({ steps, className }: ProgressTrackerProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all',
                step.status === 'completed' &&
                  'bg-success border-success text-success-foreground',
                step.status === 'current' &&
                  'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30',
                step.status === 'upcoming' &&
                  'bg-muted border-border text-muted-foreground',
                step.status === 'locked' &&
                  'bg-muted/50 border-border/50 text-muted-foreground/50'
              )}
            >
              {step.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <p
              className={cn(
                'text-xs mt-2 text-center max-w-20',
                step.status === 'current' && 'text-primary font-medium',
                step.status !== 'current' && 'text-muted-foreground'
              )}
            >
              {step.label}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-2 mt-[-1.5rem]',
                index < steps.findIndex((s) => s.status === 'current')
                  ? 'bg-success'
                  : 'bg-border'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// ROLE BADGE - Clear role identification
// ============================================================================
interface RoleBadgeProps {
  role: 'student' | 'faculty' | 'admin'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const roleConfig = {
  student: {
    label: 'Student',
    icon: GraduationCap,
    color: 'bg-primary/20 text-primary border-primary/30',
  },
  faculty: {
    label: 'Faculty',
    icon: BookOpen,
    color: 'bg-secondary/20 text-secondary border-secondary/30',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    color: 'bg-warning/20 text-warning border-warning/30',
  },
}

export function RoleBadge({
  role,
  size = 'md',
  showLabel = true,
  className,
}: RoleBadgeProps) {
  const config = roleConfig[role]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.color,
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        size === 'lg' && 'px-4 py-1.5 text-sm',
        className
      )}
    >
      <Icon
        className={cn(
          size === 'sm' && 'h-3 w-3',
          size === 'md' && 'h-4 w-4',
          size === 'lg' && 'h-5 w-5'
        )}
      />
      {showLabel && <span>{config.label}</span>}
    </div>
  )
}

// ============================================================================
// METRIC CARD - Compact metric with visual indicator
// ============================================================================
interface MetricCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' }
  status?: 'success' | 'warning' | 'error' | 'default'
  className?: string
}

export function MetricCard({
  label,
  value,
  icon,
  trend,
  status = 'default',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all hover:-translate-y-0.5',
        status === 'success' && 'bg-success/5 border-success/20',
        status === 'warning' && 'bg-warning/5 border-warning/20',
        status === 'error' && 'bg-destructive/5 border-destructive/20',
        status === 'default' && 'bg-muted/30 border-border/50 hover:border-primary/30',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            'h-10 w-10 rounded-lg flex items-center justify-center',
            status === 'success' && 'bg-success/10 text-success',
            status === 'warning' && 'bg-warning/10 text-warning',
            status === 'error' && 'bg-destructive/10 text-destructive',
            status === 'default' && 'bg-primary/10 text-primary'
          )}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium flex items-center gap-0.5 px-2 py-0.5 rounded-full',
              trend.direction === 'up' && 'bg-success/10 text-success',
              trend.direction === 'down' && 'bg-destructive/10 text-destructive',
              trend.direction === 'neutral' && 'bg-muted text-muted-foreground'
            )}
          >
            <TrendingUp
              className={cn(
                'h-3 w-3',
                trend.direction === 'down' && 'rotate-180'
              )}
            />
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground font-heading">{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}

// ============================================================================
// CONTENT LIST ITEM - Consistent list item styling
// ============================================================================
interface ContentListItemProps {
  title: string
  description?: string
  icon?: ReactNode
  badge?: { label: string; variant?: 'default' | 'success' | 'warning' | 'primary' }
  meta?: string
  href?: string
  onClick?: () => void
  className?: string
}

export function ContentListItem({
  title,
  description,
  icon,
  badge,
  meta,
  href,
  onClick,
  className,
}: ContentListItemProps) {
  const content = (
    <div
      className={cn(
        'flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-muted/20 transition-all',
        (href || onClick) && 'cursor-pointer hover:border-primary/30 hover:bg-muted/40 group',
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
            {title}
          </h4>
          {badge && (
            <Badge
              className={cn(
                'text-xs border-0',
                badge.variant === 'success' && 'bg-success/20 text-success',
                badge.variant === 'warning' && 'bg-warning/20 text-warning',
                badge.variant === 'primary' && 'bg-primary/20 text-primary',
                (!badge.variant || badge.variant === 'default') && 'bg-muted text-muted-foreground'
              )}
            >
              {badge.label}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
        )}
        {meta && <p className="text-xs text-muted-foreground/70 mt-1">{meta}</p>}
      </div>
      {href && (
        <ArrowRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-2" />
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
