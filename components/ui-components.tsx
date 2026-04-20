'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Globe,
  Brain,
  BarChart3,
  Shield,
  Smartphone,
  Cloud,
  Palette,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  Clock,
  TrendingUp,
  Star,
  MessageSquare,
  ThumbsUp,
  Pin,
  Building2,
  Play,
  FileText,
  Code,
  Sparkles,
  Zap,
  Circle,
} from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

// Icon mapping
export const domainIcons: Record<string, typeof Globe> = {
  Globe,
  Brain,
  BarChart3,
  Shield,
  Smartphone,
  Cloud,
  Palette,
}

// Section Heading - Premium Typography
interface SectionHeadingProps {
  title: string
  subtitle?: string
  badge?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, subtitle, badge, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center', className)}>
      {badge && (
        <Badge variant="secondary" className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20">
          <Sparkles className="h-3 w-3 mr-1.5" />
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-5 text-balance tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// Premium Stat Card with glass effect
interface StatCardProps {
  value: string | number
  label: string
  icon?: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  variant?: 'default' | 'gradient' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StatCard({ 
  value, 
  label, 
  icon, 
  trend, 
  trendValue, 
  variant = 'default',
  size = 'md',
  className 
}: StatCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 hover:-translate-y-1',
      variant === 'default' && 'bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
      variant === 'gradient' && 'bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 hover:border-primary/40',
      variant === 'outline' && 'bg-transparent border-border hover:border-primary/50',
      className
    )}>
      <CardContent className={cn(
        'flex items-start justify-between',
        size === 'sm' && 'p-4',
        size === 'md' && 'p-5',
        size === 'lg' && 'p-6'
      )}>
        <div className="space-y-1.5">
          <p className={cn(
            'text-muted-foreground font-medium',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-sm'
          )}>{label}</p>
          <p className={cn(
            'font-bold font-heading text-foreground tracking-tight',
            size === 'sm' && 'text-xl',
            size === 'md' && 'text-2xl',
            size === 'lg' && 'text-3xl'
          )}>{value}</p>
          {trend && trendValue && (
            <p className={cn(
              'text-xs flex items-center gap-1 font-medium',
              trend === 'up' && 'text-success',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground'
            )}>
              <TrendingUp className={cn('h-3 w-3', trend === 'down' && 'rotate-180')} />
              {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className={cn(
            'rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary',
            size === 'sm' && 'h-10 w-10',
            size === 'md' && 'h-11 w-11',
            size === 'lg' && 'h-12 w-12'
          )}>
            {icon}
          </div>
        )}
      </CardContent>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/[0.02] pointer-events-none" />
    </Card>
  )
}

// Domain Card - Enhanced with better hover states
interface DomainCardProps {
  id: string
  name: string
  icon: string
  color: string
  description: string
  difficulty: string
  demand: string
  skills?: string[]
  compact?: boolean
}

export function DomainCard({ id, name, icon, color, description, difficulty, demand, skills, compact }: DomainCardProps) {
  const IconComponent = domainIcons[icon] || Globe

  if (compact) {
    return (
      <Link href={`/explore/${id}`}>
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer group h-full hover:-translate-y-0.5">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                style={{ backgroundColor: `${color}15`, boxShadow: `0 0 0 1px ${color}20` }}
              >
                <IconComponent className="h-6 w-6" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/explore/${id}`}>
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer group h-full hover:-translate-y-1">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-5">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${color}15`, boxShadow: `0 8px 32px ${color}15` }}
            >
              <IconComponent className="h-7 w-7" style={{ color }} />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs bg-muted/80 border-border/50">
                {difficulty}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors font-heading">{name}</CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-muted-foreground">Market Demand</span>
            <Badge
              variant="outline"
              className={cn(
                'text-xs font-medium',
                demand === 'Very High' && 'border-success/50 text-success bg-success/5',
                demand === 'High' && 'border-primary/50 text-primary bg-primary/5'
              )}
            >
              {demand}
            </Badge>
          </div>
          {skills && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-normal bg-muted/50">
                  {skill}
                </Badge>
              ))}
              {skills.length > 4 && (
                <Badge variant="secondary" className="text-xs font-normal bg-muted/50">
                  +{skills.length - 4}
                </Badge>
              )}
            </div>
          )}
          <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            Explore Roadmap
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

// Enhanced Skill Checklist Item with better visual states
interface SkillChecklistItemProps {
  name: string
  description?: string
  status: 'not-started' | 'in-progress' | 'completed'
  onToggle?: () => void
}

export function SkillChecklistItem({ name, description, status, onToggle }: SkillChecklistItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer group',
        status === 'completed' && 'bg-success/5 border-success/20 hover:border-success/40',
        status === 'in-progress' && 'bg-warning/5 border-warning/20 hover:border-warning/40',
        status === 'not-started' && 'bg-muted/30 border-border/50 hover:border-primary/40 hover:bg-muted/50'
      )}
      onClick={onToggle}
    >
      <div
        className={cn(
          'h-7 w-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
          status === 'completed' && 'bg-success border-success text-success-foreground shadow-sm shadow-success/20',
          status === 'in-progress' && 'border-warning bg-warning/10',
          status === 'not-started' && 'border-muted-foreground/30 group-hover:border-primary/50'
        )}
      >
        {status === 'completed' && <Check className="h-4 w-4" />}
        {status === 'in-progress' && <div className="h-2.5 w-2.5 rounded-full bg-warning animate-pulse" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          'font-medium transition-colors',
          status === 'completed' && 'text-muted-foreground line-through',
          status !== 'completed' && 'text-foreground'
        )}>
          {name}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <Badge
        variant="secondary"
        className={cn(
          'text-xs font-medium whitespace-nowrap',
          status === 'completed' && 'bg-success/10 text-success border-success/20',
          status === 'in-progress' && 'bg-warning/10 text-warning border-warning/20',
          status === 'not-started' && 'bg-muted/50 text-muted-foreground'
        )}
      >
        {status === 'not-started' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done'}
      </Badge>
    </div>
  )
}

// Enhanced Progress Bar with gradient and glow
interface ProgressBarProps {
  value: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'success'
  className?: string
}

export function ProgressBar({ 
  value, 
  label, 
  showPercentage = true, 
  size = 'md', 
  variant = 'default',
  className 
}: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2.5">
          {label && <span className="text-sm text-muted-foreground font-medium">{label}</span>}
          {showPercentage && (
            <span className={cn(
              'text-sm font-semibold',
              value >= 100 ? 'text-success' : value >= 50 ? 'text-primary' : 'text-foreground'
            )}>
              {value}%
            </span>
          )}
        </div>
      )}
      <div className={cn(
        'relative w-full bg-muted/50 rounded-full overflow-hidden',
        size === 'sm' && 'h-1.5',
        size === 'md' && 'h-2.5',
        size === 'lg' && 'h-4'
      )}>
        <div 
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variant === 'default' && 'bg-primary',
            variant === 'gradient' && 'bg-gradient-to-r from-primary via-primary to-secondary',
            variant === 'success' && (value >= 100 ? 'bg-success' : 'bg-primary')
          )}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
        {value > 0 && size === 'lg' && (
          <div 
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ left: `${Math.min(value, 100) - 10}%` }}
          />
        )}
      </div>
    </div>
  )
}

// Resource Card with better visual hierarchy
interface ResourceCardProps {
  id: string
  title: string
  source: string
  type: 'video' | 'course' | 'documentation' | 'practice'
  level: string
  duration: string
  tags: string[]
  isBookmarked?: boolean
  onBookmark?: () => void
}

export function ResourceCard({
  title,
  source,
  type,
  level,
  duration,
  tags,
  isBookmarked,
  onBookmark,
}: ResourceCardProps) {
  const typeIcons = {
    video: Play,
    course: BookmarkCheck,
    documentation: FileText,
    practice: Code,
  }
  const typeColors = {
    video: 'text-red-400 bg-red-500/10',
    course: 'text-primary bg-primary/10',
    documentation: 'text-blue-400 bg-blue-500/10',
    practice: 'text-green-400 bg-green-500/10',
  }
  const TypeIcon = typeIcons[type]

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-0.5">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className={cn('h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0', typeColors[type])}>
              <TypeIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{source}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 text-muted-foreground hover:text-primary h-9 w-9"
            onClick={onBookmark}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
          <Badge variant="secondary" className="text-xs bg-muted/50">{level}</Badge>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {duration}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal border-border/50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Project Card with premium styling
interface ProjectCardProps {
  id: string
  title: string
  domain: string
  difficulty: string
  description: string
  skills: string[]
  duration: string
  category: string
  isSaved?: boolean
  onSave?: () => void
}

export function ProjectCard({
  title,
  difficulty,
  description,
  skills,
  duration,
  category,
  isSaved,
  onSave,
}: ProjectCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 group h-full hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge
            variant="secondary"
            className={cn(
              'text-xs font-medium',
              difficulty === 'Beginner' && 'bg-success/10 text-success border-success/20',
              difficulty === 'Intermediate' && 'bg-warning/10 text-warning border-warning/20',
              difficulty === 'Advanced' && 'bg-destructive/10 text-destructive border-destructive/20'
            )}
          >
            {difficulty}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={onSave}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors mt-3 font-heading">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2 leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs font-normal border-border/50">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/30">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {duration}
          </span>
          <Badge variant="secondary" className="text-xs capitalize bg-muted/50">{category}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Company Card
interface CompanyCardProps {
  id: string
  name: string
  type: string
  roles: string[]
  skills: string[]
  difficulty: string
  package: string
}

export function CompanyCard({ name, type, roles, skills, difficulty, package: pkg }: CompanyCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-0.5">
      <CardContent className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Open Roles</p>
            <div className="flex flex-wrap gap-1.5">
              {roles.slice(0, 2).map((role) => (
                <Badge key={role} variant="secondary" className="text-xs font-normal bg-muted/50">
                  {role}
                </Badge>
              ))}
              {roles.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-muted/50">+{roles.length - 2}</Badge>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <span className="text-sm text-muted-foreground">{difficulty}</span>
            <span className="text-sm font-semibold text-primary">{pkg}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Discussion Card
interface DiscussionCardProps {
  id: number
  title: string
  author: string
  category: string
  replies: number
  likes: number
  time: string
  pinned?: boolean
}

export function DiscussionCard({ title, author, category, replies, likes, time, pinned }: DiscussionCardProps) {
  return (
    <Card className={cn(
      'bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:-translate-y-0.5',
      pinned && 'border-primary/30 bg-primary/5'
    )}>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          {pinned && (
            <Pin className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium">{author}</span>
              <Badge variant="secondary" className="text-xs bg-muted/50">{category}</Badge>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {replies}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5" />
                {likes}
              </span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Feature Card - Premium styling
interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <CardContent className="p-7">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2.5 group-hover:text-primary transition-colors font-heading">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

// Testimonial Card with premium quote styling
interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  domain: string
}

export function TestimonialCard({ name, role, quote, domain }: TestimonialCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 relative overflow-hidden">
      <CardContent className="p-7">
        <div className="flex items-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-warning text-warning" />
          ))}
        </div>
        <blockquote className="text-foreground mb-6 italic leading-relaxed relative">
          <span className="absolute -top-2 -left-1 text-4xl text-primary/20 font-serif">&ldquo;</span>
          <span className="relative z-10">{quote}</span>
        </blockquote>
        <div className="flex items-center gap-4 pt-5 border-t border-border/30">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center ring-2 ring-background">
            <span className="text-sm font-semibold text-foreground">{name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">{domain}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Filter Chip with improved hover states
interface FilterChipProps {
  label: string
  isActive?: boolean
  onClick?: () => void
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {label}
    </button>
  )
}

// Enhanced Next Step Card with premium CTA styling
interface NextStepCardProps {
  title: string
  description: string
  action: string
  href: string
  icon?: ReactNode
  priority?: 'high' | 'medium' | 'low'
}

export function NextStepCard({ title, description, action, href, icon, priority = 'high' }: NextStepCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5',
      priority === 'high' && 'bg-gradient-to-br from-primary/15 via-card to-secondary/15 border-primary/30 shadow-lg shadow-primary/5',
      priority === 'medium' && 'bg-gradient-to-br from-secondary/10 to-card border-secondary/30',
      priority === 'low' && 'bg-card border-border'
    )}>
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          {icon && (
            <div className={cn(
              'h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm',
              priority === 'high' && 'bg-gradient-to-br from-primary/30 to-primary/10 text-primary',
              priority === 'medium' && 'bg-secondary/20 text-secondary',
              priority === 'low' && 'bg-muted text-muted-foreground'
            )}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {priority === 'high' && (
                <Badge className="bg-primary/20 text-primary border-0 text-xs px-2">
                  <Zap className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-1.5 font-heading">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
            <Link href={href}>
              <Button 
                size="sm" 
                className={cn(
                  'transition-all',
                  priority === 'high' && 'bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20',
                  priority !== 'high' && 'bg-muted text-foreground hover:bg-muted/80'
                )}
              >
                {action}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
      {priority === 'high' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
      )}
    </Card>
  )
}

// Timeline Phase Card for Roadmap
interface TimelinePhaseProps {
  number: number
  name: string
  duration: string
  description: string
  progress: number
  isActive: boolean
  isCompleted: boolean
  color: string
  onToggle: () => void
  isExpanded: boolean
  children?: ReactNode
}

export function TimelinePhase({ 
  number, 
  name, 
  duration, 
  description, 
  progress, 
  isActive, 
  isCompleted,
  color,
  onToggle,
  isExpanded,
  children
}: TimelinePhaseProps) {
  return (
    <div className="relative">
      {/* Timeline connector */}
      <div className="absolute left-7 top-[4.5rem] bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent" />
      
      <Card className={cn(
        'relative overflow-hidden transition-all duration-300',
        isExpanded && 'border-primary/40 shadow-lg shadow-primary/5',
        !isExpanded && 'hover:border-primary/30'
      )}>
        {/* Phase Header */}
        <button
          onClick={onToggle}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/20 transition-colors"
        >
          <div className="flex items-center gap-5">
            <div
              className={cn(
                'h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-bold transition-all',
                isCompleted && 'bg-success/20 text-success shadow-sm shadow-success/10',
                isActive && !isCompleted && 'shadow-lg',
                !isActive && !isCompleted && 'bg-muted/50 text-muted-foreground'
              )}
              style={{ 
                backgroundColor: !isCompleted ? (isActive ? `${color}20` : undefined) : undefined,
                color: !isCompleted && isActive ? color : undefined,
                boxShadow: isActive && !isCompleted ? `0 8px 32px ${color}20` : undefined
              }}
            >
              {isCompleted ? (
                <Check className="h-7 w-7" />
              ) : (
                <span className="font-heading">{String(number).padStart(2, '0')}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-foreground font-heading">{name}</h3>
                {isActive && !isCompleted && (
                  <Badge className="bg-primary/20 text-primary border-0 text-xs">Current</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-4">
              <div className="w-40">
                <ProgressBar value={progress} showPercentage={false} size="sm" />
              </div>
              <span className={cn(
                'text-sm font-semibold w-12 text-right',
                progress >= 100 ? 'text-success' : progress > 0 ? 'text-primary' : 'text-muted-foreground'
              )}>
                {progress}%
              </span>
            </div>
            <div className={cn(
              'h-8 w-8 rounded-lg flex items-center justify-center transition-all',
              isExpanded ? 'bg-primary/10 text-primary rotate-180' : 'bg-muted/50 text-muted-foreground'
            )}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>

        {/* Phase Content */}
        {isExpanded && (
          <div className="border-t border-border/50">
            <CardContent className="p-6 pt-5">
              <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
              {children}
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  )
}

// Placement Readiness Meter
interface ReadinessMeterProps {
  label: string
  value: number
  icon: ReactNode
  color?: string
}

export function ReadinessMeter({ label, value, icon, color = 'primary' }: ReadinessMeterProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
      <div className={cn(
        'h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0',
        color === 'primary' && 'bg-primary/10 text-primary',
        color === 'success' && 'bg-success/10 text-success',
        color === 'warning' && 'bg-warning/10 text-warning',
        color === 'secondary' && 'bg-secondary/10 text-secondary'
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className={cn(
            'text-sm font-semibold',
            value >= 80 ? 'text-success' : value >= 50 ? 'text-primary' : 'text-muted-foreground'
          )}>
            {value}%
          </span>
        </div>
        <ProgressBar value={value} showPercentage={false} size="sm" variant={value >= 80 ? 'success' : 'default'} />
      </div>
    </div>
  )
}
