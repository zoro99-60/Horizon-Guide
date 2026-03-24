"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { quizQuestions as mockQuestions, domains } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, HelpCircle, RotateCcw, Sparkles } from "lucide-react"

type QuizState = "start" | "active" | "result"

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("start")
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [questions, setQuestions] = useState(mockQuestions)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getQuizQuestions() // Assuming api.getQuizQuestions() exists and returns an array of questions
        if (data && data.length > 0) {
          setQuestions(data)
        }
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error)
        // Fallback to mockQuestions is already handled by initial useState value
      }
    }
    loadData()
  }, [])

  const progress = ((currentQ + 1) / questions.length) * 100

  const results = useMemo(() => {
    if (state !== "result") return []
    const scores: Record<string, number> = {}
    Object.entries(answers).forEach(([qIdx, optIdx]) => {
      const question = questions[parseInt(qIdx)]
      const option = question.options[optIdx]
      Object.entries(option.weights as Record<string, number>).forEach(([domainId, weight]) => {
        scores[domainId] = (scores[domainId] || 0) + weight
      })
    })

    const maxScore = Math.max(...Object.values(scores))
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([domainId, score]) => ({
        domain: domains.find((d) => d.id === domainId)!,
        score,
        percentage: Math.round((score / maxScore) * 100),
      }))
  }, [answers, state])

  useEffect(() => {
    if (state === "result" && results.length > 0) {
      async function saveResult() {
        try {
          const { createClient } = await import("@/utils/supabase/client")
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            await supabase.from("quiz_results").insert({
              user_id: user.id,
              quiz_data: { answers, results: results.map(r => ({ domainId: r.domain.id, percentage: r.percentage })) },
              result_type: results[0].domain.id
            })
          }
        } catch (error) {
          console.error("Failed to save quiz result:", error)
        }
      }
      saveResult()
    }
  }, [state, results])

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1)
    } else {
      setState("result")
    }
  }

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1)
  }

  const handleRestart = () => {
    setState("start")
    setCurrentQ(0)
    setAnswers({})
  }

  // ─── Start Screen ──────────────────────────────────────────────
  if (state === "start") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <HelpCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Career Aptitude Quiz
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
            Answer 10 quick questions about your interests, preferences, and strengths.
            We will recommend the top 3 engineering career domains that match your profile.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">10 Questions</Badge>
              <Badge variant="secondary">5 Minutes</Badge>
              <Badge variant="secondary">Instant Results</Badge>
            </div>
          </div>
          <Button
            size="lg"
            className="mt-8 gap-2"
            onClick={() => setState("active")}
          >
            Start Quiz
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // ─── Result Screen ─────────────────────────────────────────────
  if (state === "result") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Your Results
          </h1>
          <p className="mt-2 text-muted-foreground">
            Based on your answers, here are the top career domains for you.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {results.map((item, index) => {
            const Icon = item.domain.icon
            return (
              <Card
                key={item.domain.id}
                className={`border bg-card ${index === 0 ? "ring-2 ring-primary/20" : ""}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.domain.bgClass}`}>
                      <Icon className={`h-6 w-6 ${item.domain.colorClass}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {item.domain.title}
                        </h3>
                        {index === 0 && (
                          <Badge className="bg-primary text-primary-foreground">
                            Best Match
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.domain.shortDescription}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <Progress value={item.percentage} className="h-2 flex-1" />
                        <span className="text-sm font-semibold text-primary">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="mt-3">
                        <Button asChild size="sm" variant={index === 0 ? "default" : "outline"}>
                          <Link href="/roadmaps">View Roadmap</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" onClick={handleRestart} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
          <Button asChild>
            <Link href="/career-insights">Explore All Domains</Link>
          </Button>
        </div>
      </div>
    )
  }

  // ─── Active Quiz ───────────────────────────────────────────────
  const question = questions[currentQ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:px-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQ + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQ]?.toString() ?? ""}
            onValueChange={(val) => handleSelect(parseInt(val))}
          >
            <div className="flex flex-col gap-3">
              {question.options.map((option: any, idx: number) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3.5 transition-colors hover:bg-accent has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/5"
                >
                  <RadioGroupItem value={idx.toString()} />
                  <span className="text-sm font-medium text-foreground">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQ === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={answers[currentQ] === undefined}
          className="gap-2"
        >
          {currentQ === questions.length - 1 ? "See Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
