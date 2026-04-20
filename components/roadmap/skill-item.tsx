import { CheckCircle2, Circle, PlayCircle } from 'lucide-react'

interface SkillItemProps {
  name: string
  description: string
  status: 'not-started' | 'in-progress' | 'completed'
  onToggle: () => void
}

export function SkillItem({ name, description, status, onToggle }: SkillItemProps) {
  return (
    <div
      onClick={onToggle}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        status === 'completed'
          ? 'bg-success/5 border-success/20'
          : status === 'in-progress'
            ? 'bg-primary/5 border-primary/20'
            : 'bg-muted/30 border-border/50 hover:border-primary/30'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 transition-colors ${
          status === 'completed' ? 'text-success' : 
          status === 'in-progress' ? 'text-primary' : 
          'text-muted-foreground'
        }`}>
          {status === 'completed' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : status === 'in-progress' ? (
            <PlayCircle className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${
            status === 'completed' ? 'text-foreground line-through opacity-70' : 'text-foreground'
          }`}>
            {name}
          </p>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
