'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Users,
  Map,
  Building2,
  BookOpen,
  Lightbulb,
  BarChart3,
  Settings,
  TrendingUp,
  Activity,
  Plus,
  ArrowUpRight,
  Database,
  Clock,
} from 'lucide-react'

const platformStats = [
  { label: 'Total Users', value: '1,247', change: '+12%', icon: Users },
  { label: 'Active Roadmaps', value: '7', change: '+2', icon: Map },
  { label: 'Companies', value: '6', change: '+1', icon: Building2 },
  { label: 'Resources', value: '10', change: '+3', icon: BookOpen },
  { label: 'Projects', value: '8', change: '+2', icon: Lightbulb },
  { label: 'Quiz Attempts', value: '856', change: '+48', icon: BarChart3 },
]

const contentSections = [
  {
    title: 'Roadmap Management',
    description: 'Create, edit, and manage career roadmaps and skill phases',
    icon: Map,
    stats: '7 roadmaps • 142 skills',
    actions: ['Add Roadmap', 'Edit Phases', 'Manage Skills'],
    color: 'text-primary',
  },
  {
    title: 'Company Database',
    description: 'Manage company profiles, roles, and placement data',
    icon: Building2,
    stats: '6 companies • 22 roles',
    actions: ['Add Company', 'Update Packages', 'Manage Roles'],
    color: 'text-amber-400',
  },
  {
    title: 'Learning Resources',
    description: 'Curate courses, videos, and documentation links',
    icon: BookOpen,
    stats: '10 resources • 7 domains',
    actions: ['Add Resource', 'Edit Tags', 'Manage Categories'],
    color: 'text-success',
  },
  {
    title: 'Project Ideas',
    description: 'Manage project ideas for students across all domains',
    icon: Lightbulb,
    stats: '8 projects • 5 domains',
    actions: ['Add Project', 'Set Difficulty', 'Assign Domain'],
    color: 'text-secondary',
  },
  {
    title: 'Domain Management',
    description: 'Manage career domains, skills, salary data, and roles',
    icon: Database,
    stats: '7 domains • 63 skills',
    actions: ['Add Domain', 'Edit Skills', 'Update Stats'],
    color: 'text-red-400',
  },
  {
    title: 'Quiz Management',
    description: 'Manage career quiz questions and domain mappings',
    icon: BarChart3,
    stats: '10 questions • 7 domains',
    actions: ['Add Question', 'Edit Options', 'Review Mappings'],
    color: 'text-cyan-400',
  },
]

const recentChanges = [
  { action: 'Added new company: Cognizant', user: 'Admin', time: '2 hours ago' },
  { action: 'Updated Web Development roadmap Phase 3', user: 'Admin', time: '5 hours ago' },
  { action: 'Published 2 new learning resources', user: 'Admin', time: '1 day ago' },
  { action: 'Added Cloud-native Microservices project', user: 'Admin', time: '2 days ago' },
  { action: 'Updated salary data for AI/ML roles', user: 'Admin', time: '3 days ago' },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <Shield className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage platform content and monitor system health</p>
          </div>
        </div>
        <Button variant="outline" className="text-sm">
          <Settings className="h-4 w-4 mr-2" />
          Platform Settings
        </Button>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {platformStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-[10px] border-success/50 text-success">
                    <ArrowUpRight className="h-2.5 w-2.5 mr-0.5" />
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Content Management Grid */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Content Management
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {contentSections.map((section) => {
              const Icon = section.icon
              return (
                <Card key={section.title} className="bg-card border-border hover:border-primary/50 transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                        <Icon className={`h-5 w-5 ${section.color}`} />
                      </div>
                      <Badge variant="outline" className="text-[10px]">{section.stats}</Badge>
                    </div>

                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {section.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">{section.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {section.actions.map((action) => (
                        <Button key={action} variant="outline" size="sm" className="text-[10px] h-7 px-2.5">
                          <Plus className="h-2.5 w-2.5 mr-1" />
                          {action}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Changes */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5 text-primary" />
                Recent Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentChanges.map((change, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">{change.action}</p>
                      <p className="text-[10px] text-muted-foreground">{change.user} • {change.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="bg-gradient-to-br from-amber-500/10 to-red-500/10 border-amber-500/30">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-amber-400" />
                System Health
              </h3>
              <div className="space-y-3">
                <StatusRow label="Frontend" status="Operational" ok />
                <StatusRow label="LocalStorage" status="Active" ok />
                <StatusRow label="Mock Data" status="Loaded" ok />
                <StatusRow label="Auth System" status="Demo Mode" ok={false} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatusRow({ label, status, ok }: { label: string; status: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${ok ? 'bg-success' : 'bg-amber-400'}`} />
        <span className={`text-xs font-medium ${ok ? 'text-success' : 'text-amber-400'}`}>{status}</span>
      </div>
    </div>
  )
}
