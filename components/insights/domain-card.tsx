import type { Domain } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, IndianRupee } from "lucide-react"
import { cn } from "@/lib/utils"

interface DomainCardProps {
  domain: Domain
  isSelected: boolean
  onClick: () => void
}

export function DomainCard({ domain, isSelected, onClick }: DomainCardProps) {
  const Icon = domain.icon

  return (
    <Card
      className={cn(
        "group cursor-pointer border transition-all duration-300 hover-lift press-effect",
        isSelected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-2 ring-primary/25"
          : "hover:border-primary/40 hover:bg-accent/40 hover-glow"
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
              domain.bgClass,
              isSelected ? "scale-110" : "group-hover:scale-110 group-hover:rotate-3"
            )}
          >
            <Icon className={cn("h-5 w-5 transition-transform duration-300", domain.colorClass)} />
          </div>
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold transition-colors duration-200",
              isSelected ? "text-primary" : "text-foreground"
            )}>
              {domain.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {domain.shortDescription}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {domain.roles.length} roles
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="h-3.5 w-3.5" />
                {domain.salaryRange}
              </span>
            </div>
          </div>
          {/* Selected indicator dot */}
          <div className={cn(
            "mt-1 h-2 w-2 shrink-0 rounded-full bg-primary transition-all duration-300",
            isSelected ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )} />
        </div>
      </CardContent>
    </Card>
  )
}
