import type { Domain } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DomainCompareProps {
  domainA: Domain
  domainB: Domain
}

export function DomainCompare({ domainA, domainB }: DomainCompareProps) {
  const rows = [
    { label: "Salary Range", a: domainA.salaryRange, b: domainB.salaryRange },
    {
      label: "Number of Roles",
      a: `${domainA.roles.length} roles`,
      b: `${domainB.roles.length} roles`,
    },
    {
      label: "Skills Required",
      a: `${domainA.skills.length} skills`,
      b: `${domainB.skills.length} skills`,
    },
  ]

  return (
    <Card className="border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Domain Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Attribute</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <domainA.icon className={`h-4 w-4 ${domainA.colorClass}`} />
                  {domainA.title}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <domainB.icon className={`h-4 w-4 ${domainB.colorClass}`} />
                  {domainB.title}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium text-foreground">
                  {row.label}
                </TableCell>
                <TableCell className="text-muted-foreground">{row.a}</TableCell>
                <TableCell className="text-muted-foreground">{row.b}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-medium text-foreground">Top Skills</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {domainA.skills.slice(0, 4).map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {domainB.skills.slice(0, 4).map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Top Roles</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {domainA.roles.slice(0, 3).map((r) => (
                    <span key={r} className="text-sm text-muted-foreground">
                      {r}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {domainB.roles.slice(0, 3).map((r) => (
                    <span key={r} className="text-sm text-muted-foreground">
                      {r}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
