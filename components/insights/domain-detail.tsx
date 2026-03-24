import type { Domain } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Briefcase, IndianRupee, TrendingUp, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface DomainDetailProps {
  domain: Domain
}

export function DomainDetail({ domain }: DomainDetailProps) {
  const Icon = domain.icon

  return (
    <Card className="border bg-card animate-fade-left overflow-hidden">
      {/* Gradient header bar */}
      <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/40" />
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 hover:scale-110", domain.bgClass)}>
            <Icon className={cn("h-6 w-6", domain.colorClass)} />
          </div>
          <div>
            <CardTitle className="text-xl">{domain.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{domain.shortDescription}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Overview */}
        <div className="animate-fade-up" style={{ animationDelay: "50ms" }}>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Overview</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{domain.overview}</p>
        </div>

        <Separator />

        {/* Skills */}
        <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Required Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {domain.skills.map((skill, i) => (
              <Badge
                key={skill}
                variant="secondary"
                className="transition-all duration-200 hover:bg-primary/20 hover:text-primary cursor-default"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Job Roles */}
        <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Briefcase className="h-4 w-4 text-primary" />
            Job Roles
          </h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {domain.roles.map((role) => (
              <div
                key={role}
                className="rounded-md border border-border px-3 py-2 text-sm text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-default"
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Salary */}
        <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <IndianRupee className="h-4 w-4 text-primary" />
            Salary Range
          </h4>
          <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-4 border border-primary/15">
            <p className="text-xl font-bold text-primary">{domain.salaryRange}</p>
            <p className="mt-1 text-xs text-muted-foreground">Annual salary range (LPA - Indian Rupees)</p>
          </div>
        </div>

        <Separator />

        {/* Future Scope */}
        <div className="animate-fade-up" style={{ animationDelay: "250ms" }}>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Future Scope
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{domain.futureScope}</p>
        </div>
      </CardContent>
    </Card>
  )
}
