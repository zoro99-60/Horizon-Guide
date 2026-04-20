import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 lg:p-12 border border-dashed border-border rounded-xl bg-card/50 ${className}`}>
      {icon && (
        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
