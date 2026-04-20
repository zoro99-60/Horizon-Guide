'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  GraduationCap,
  Users,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  BookOpen,
  Target,
  Award,
  Clock,
  Layers,
} from 'lucide-react'

const studentMetrics = {
  totalStudents: 248,
  activeStudents: 186,
  completedOnboarding: 210,
  savedRoadmaps: 164,
  avgProgress: 34,
}

const yearWiseBreakdown = [
  { year: '1st Year', students: 72, avgProgress: 18, topDomain: 'Web Development', riskStudents: 12 },
  { year: '2nd Year', students: 68, avgProgress: 35, topDomain: 'AI & Machine Learning', riskStudents: 8 },
  { year: '3rd Year', students: 61, avgProgress: 48, topDomain: 'Data Science', riskStudents: 5 },
  { year: '4th Year', students: 47, avgProgress: 62, topDomain: 'Cloud & DevOps', riskStudents: 3 },
]

const weakAreas = [
  { topic: 'Data Structures & Algorithms', percentage: 68, severity: 'high' },
  { topic: 'System Design', percentage: 54, severity: 'high' },
  { topic: 'Aptitude & Reasoning', percentage: 47, severity: 'medium' },
  { topic: 'Database Management', percentage: 42, severity: 'medium' },
  { topic: 'Communication Skills', percentage: 38, severity: 'low' },
]

const recentActivity = [
  { student: 'Priya Sharma', action: 'Completed Web Development Phase 2', time: '2 hours ago' },
  { student: 'Arjun Mehta', action: 'Saved AI/ML Roadmap', time: '4 hours ago' },
  { student: 'Sneha Tiwari', action: 'Finished Career Quiz', time: '6 hours ago' },
  { student: 'Vikram Patel', action: 'Completed 50 DSA Problems', time: '1 day ago' },
  { student: 'Meera Krishnan', action: 'Submitted Mock Interview', time: '1 day ago' },
]

const severityColors: Record<string, string> = {
  high: 'text-red-400',
  medium: 'text-amber-400',
  low: 'text-success',
}

export default function FacultyDashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-secondary/15 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Faculty Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitor student progress and identify areas for improvement</p>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <MetricCard icon={Users} label="Total Students" value={studentMetrics.totalStudents} />
        <MetricCard icon={TrendingUp} label="Active" value={studentMetrics.activeStudents} color="text-success" />
        <MetricCard icon={Target} label="Onboarded" value={studentMetrics.completedOnboarding} />
        <MetricCard icon={BookOpen} label="Saved Roadmaps" value={studentMetrics.savedRoadmaps} />
        <MetricCard icon={BarChart3} label="Avg Progress" value={`${studentMetrics.avgProgress}%`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Year-wise Breakdown */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Year-wise Student Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {yearWiseBreakdown.map((year) => (
                <div key={year.year} className="p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{year.year}</p>
                      <p className="text-[10px] text-muted-foreground">{year.students} students • Top: {year.topDomain}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {year.riskStudents > 0 && (
                        <Badge variant="outline" className="text-[10px] border-red-500/30 text-red-400">
                          <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                          {year.riskStudents} at risk
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{year.avgProgress}%</Badge>
                    </div>
                  </div>
                  <Progress value={year.avgProgress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weak Areas */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Common Weak Areas
              </CardTitle>
              <CardDescription>Topics where students struggle the most</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {weakAreas.map((area) => (
                <div key={area.topic} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                  <p className="text-sm font-medium text-foreground">{area.topic}</p>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${severityColors[area.severity]}`}>
                      {area.percentage}% struggle
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary">
                      {activity.student.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.student}</p>
                      <p className="text-[10px] text-muted-foreground">{activity.action}</p>
                      <p className="text-[10px] text-muted-foreground/60">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/30">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-secondary" />
                Top Performing Students
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Priya Sharma</span>
                  <Badge variant="outline" className="text-[10px] border-success/50 text-success">92%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Arjun Mehta</span>
                  <Badge variant="outline" className="text-[10px] border-success/50 text-success">87%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sneha Tiwari</span>
                  <Badge variant="outline" className="text-[10px] border-success/50 text-success">85%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color?: string }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
        <p className={`text-xl font-bold ${color || 'text-foreground'}`}>{value}</p>
      </CardContent>
    </Card>
  )
}
