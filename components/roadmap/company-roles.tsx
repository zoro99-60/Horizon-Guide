"use client"

import { useState } from "react"
import type { Company } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Building2, Briefcase, IndianRupee, TrendingUp, ExternalLink } from "lucide-react"

interface CompanyRolesProps {
  companies: Company[]
  domainTitle: string
}

export function CompanyRoles({ companies, domainTitle }: CompanyRolesProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>("all")

  const filteredCompanies =
    selectedCompany === "all"
      ? companies
      : companies.filter((c) => c.name === selectedCompany)

  const totalRoles = companies.reduce((acc, c) => acc + c.roles.length, 0)

  return (
    <Card className="border bg-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Companies Hiring in {domainTitle}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {companies.length} companies &middot; {totalRoles} open roles
              </p>
            </div>
          </div>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="multiple" defaultValue={[filteredCompanies[0]?.name]} className="flex flex-col gap-3">
          {filteredCompanies.map((company) => (
            <AccordionItem
              key={company.name}
              value={company.name}
              className="rounded-lg border border-border bg-background px-4 last:border-b"
            >
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Avatar className="h-9 w-9 rounded-md border border-border">
                    <AvatarFallback className="rounded-md bg-muted text-xs font-bold text-foreground">
                      {company.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.industry}</p>
                  </div>
                  <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
                    {company.roles.length} {company.roles.length === 1 ? "role" : "roles"}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 pb-2">
                  {company.roles.map((role) => (
                    <div
                      key={role.title}
                      className="flex flex-col gap-3 rounded-md border border-border bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{role.title}</p>
                          <p className="text-xs text-muted-foreground">{role.level}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pl-7 sm:pl-0">
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-semibold text-foreground">{role.salaryRange}</span>
                        </div>
                        <Button asChild size="sm" variant="outline" className="h-7 gap-1.5 text-xs">
                          <a href={role.applyUrl} target="_blank" rel="noopener noreferrer">
                            Apply
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Summary bar */}
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>
            Salary data is in Indian Rupees (LPA) and varies by location, experience, and company size.
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
