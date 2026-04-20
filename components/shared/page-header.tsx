import { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

interface PageHeaderProps {
  title: string
  description?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
  badgeLabel?: string
  icon?: ReactNode
  action?: ReactNode
}

export function PageHeader({ title, description, badgeVariant = 'default', badgeLabel, icon, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">{title}</h1>
            {badgeLabel && (
              <Badge variant={badgeVariant === 'success' || badgeVariant === 'warning' ? 'secondary' : badgeVariant} 
                     className={badgeVariant === 'success' ? 'bg-success/20 text-success' : badgeVariant === 'warning' ? 'bg-warning/20 text-warning' : ''}>
                {badgeLabel}
              </Badge>
            )}
          </div>
          {description && <p className="text-muted-foreground mt-1 max-w-2xl">{description}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
