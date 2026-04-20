import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Map, LayoutDashboard } from 'lucide-react'

// Adjust Domain interface if different in your data/mockData.ts
export interface QuizDomain {
  id: string
  name: string
  overview: string
  description?: string
  difficulty: string
  demand: string
  avgSalary: string
  skills: string[]
  suitableFor: string[]
}

interface ResultSummaryProps {
  primaryDomain: QuizDomain
  secondaryDomain: QuizDomain | null
  onRetake: () => void
}

export function ResultSummary({ primaryDomain, secondaryDomain, onRetake }: ResultSummaryProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-2xl bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
      </div>
      <Badge variant="secondary" className="mb-4 bg-success/10 text-success">
        Quiz Complete!
      </Badge>
      <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
        Your Recommended Career Domain
      </h1>

      {/* Primary Result */}
      <Card className="bg-card border-primary/30 mb-6 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
        <CardContent className="p-8">
          <Badge className="mb-4 bg-primary/10 text-primary">
            Best Match
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-3">
            {primaryDomain.name}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {primaryDomain.overview}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-muted-foreground mb-1">Difficulty</p>
              <p className="font-medium text-foreground">{primaryDomain.difficulty}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-muted-foreground mb-1">Demand</p>
              <p className="font-medium text-success">{primaryDomain.demand}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-muted-foreground mb-1">Avg Salary</p>
              <p className="font-medium text-foreground">{primaryDomain.avgSalary}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {primaryDomain.skills.slice(0, 6).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Result */}
      {secondaryDomain && (
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <Badge variant="secondary" className="mb-2">
                  Also Consider
                </Badge>
                <h3 className="text-lg font-semibold text-foreground">
                  {secondaryDomain.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {secondaryDomain.description}
                </p>
              </div>
              <Link href={`/roadmaps/${secondaryDomain.id}`}>
                <Button variant="outline" size="sm">
                  View Roadmap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Why This Matches */}
      <Card className="bg-card border-border mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Why This Matches You</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-left space-y-3">
            <li className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              Your responses indicate a strong interest in {primaryDomain.suitableFor?.[0]?.toLowerCase() || 'this field'}.
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              The skills in this domain align with your problem-solving approach.
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              High demand in the job market means excellent career opportunities.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href={`/roadmaps/${primaryDomain.id}`}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg glow-primary">
            <Map className="h-5 w-5 mr-2" />
            View Roadmap
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button size="lg" variant="outline">
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        Want to retake the quiz?{' '}
        <button
          onClick={onRetake}
          className="text-primary hover:underline"
        >
          Start over
        </button>
      </p>
    </div>
  )
}
