import { recommendedNext } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface RecommendedNextProps {
  latestQuiz?: any
}

export function RecommendedNext({ latestQuiz }: RecommendedNextProps) {
  const recommendations = [...recommendedNext]
  
  if (latestQuiz && latestQuiz.result_type) {
    const domainId = latestQuiz.result_type
    recommendations.unshift({
      title: `Explore ${domainId.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`,
      description: "Based on your latest quiz, this is your best career match. Start your roadmap now!",
      domain: "Recommended"
    })
  }

  return (
    <Card className="border bg-card">
      <CardHeader>
        <CardTitle className="text-base">Recommended Next Steps</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {recommendations.slice(0, 4).map((item) => (
          <div
            key={item.title}
            className="group flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/30 hover:bg-accent/50"
          >
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <ArrowRight className="h-3 w-3 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {item.domain}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
