import Link from "next/link"
import { savedRoadmaps } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface SavedRoadmapsProps {
  roadmaps: any[]
}

export function SavedRoadmaps({ roadmaps }: SavedRoadmapsProps) {
  if (roadmaps.length === 0) {
    return (
      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Saved Roadmaps</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-sm text-muted-foreground">No roadmaps saved yet.</p>
          <Link href="/roadmaps" className="mt-2 text-sm font-medium text-primary hover:underline">
            Create your first roadmap
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border bg-card">
      <CardHeader>
        <CardTitle className="text-base">Saved Roadmaps</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {roadmaps.map((roadmap) => (
          <Link key={roadmap.id} href="/dashboard" className="group">
            <div className="flex flex-col gap-2 rounded-lg border border-border p-3 transition-colors hover:border-primary/30 hover:bg-accent/50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  {roadmap.title}
                </h4>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs capitalize">
                  {roadmap.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(roadmap.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={roadmap.progress || 0} className="h-1.5 flex-1" />
                <span className="text-xs font-medium text-primary">
                  {roadmap.progress || 0}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
