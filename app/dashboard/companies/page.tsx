'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { companies, roles } from '@/data/mockData'
import {
  Building2,
  Briefcase,
  Search,
  DollarSign,
  Target,
  BookOpen,
  Users,
  ArrowRight,
} from 'lucide-react'

const difficultyColor: Record<string, string> = {
  'Easy to Moderate': 'bg-success/15 text-success border-success/30',
  Moderate: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  High: 'bg-red-500/15 text-red-400 border-red-500/30',
}

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'companies' | 'roles'>('companies')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies
    const q = searchQuery.toLowerCase()
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.roles.some((r) => r.toLowerCase().includes(q)) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return roles
    const q = searchQuery.toLowerCase()
    return roles.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.domain.toLowerCase().includes(q) ||
        r.skills.some((s) => s.toLowerCase().includes(q))
    )
  }, [searchQuery])

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Companies & Roles</h1>
            <p className="text-sm text-muted-foreground">Explore target companies and career roles</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search companies, roles, or skills..."
          className="pl-11 h-11 bg-card border-border"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('companies')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'companies'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <Building2 className="h-4 w-4 inline mr-2" />
          Companies ({filteredCompanies.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('roles')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'roles'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <Briefcase className="h-4 w-4 inline mr-2" />
          Career Roles ({filteredRoles.length})
        </button>
      </div>

      {/* Companies Tab */}
      {activeTab === 'companies' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="bg-card border-border hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="text-xs">{company.type}</Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${difficultyColor[company.difficulty] || 'text-muted-foreground'}`}
                    >
                      {company.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {company.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Package */}
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">{company.package}</span>
                </div>

                {/* Roles */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">Roles Offered</p>
                  <div className="flex flex-wrap gap-1.5">
                    {company.roles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-[10px]">{role}</Badge>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {company.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-[10px]">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* Prep Focus */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">Preparation Focus</p>
                  <div className="flex flex-wrap gap-1.5">
                    {company.preparationFocus.map((focus) => (
                      <Badge key={focus} className="bg-primary/10 text-primary border-primary/30 text-[10px]">{focus}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="bg-card border-border hover:border-primary/50 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {role.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{role.domain}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-success text-success">{role.demand}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">{role.salary}</span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">Key Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
