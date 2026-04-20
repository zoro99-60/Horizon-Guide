'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { quizQuestions, domains } from '@/data/mockData'
import { getProfile, saveQuizResult, getQuizResult } from '@/lib/store'
import { QuestionCard } from '@/components/quiz/question-card'
import { ResultSummary, QuizDomain } from '@/components/quiz/result-summary'
import {
  ArrowRight,
  ClipboardList,
  Sparkles,
  Target,
  Map,
  UserCheck,
} from 'lucide-react'

type QuizState = 'intro' | 'quiz' | 'result'

interface QuizAnswer {
  questionId: number
  selectedIndex: number
  domains: string[]
}

export default function QuizPage() {
  const router = useRouter()

  const [state, setState] = useState<QuizState>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [result, setResult] = useState<{ primary: string; secondary: string } | null>(null)

  const [profileChecked, setProfileChecked] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const profile = getProfile()
    setHasCompletedOnboarding(!!profile?.onboardingComplete)
    
    const existingResult = getQuizResult()
    if (existingResult) {
      setResult({
        primary: existingResult.primaryDomain,
        secondary: existingResult.secondaryDomain || 'data-science'
      })
      setState('result')
    }
    
    setProfileChecked(true)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (state !== 'quiz') return
    const existingAnswer = answers[currentQuestion]
    setSelectedOption(existingAnswer ? existingAnswer.selectedIndex : null)
  }, [currentQuestion, answers, state])

  const progress = useMemo(() => {
    if (state !== 'quiz') return 0
    return ((currentQuestion + 1) / quizQuestions.length) * 100
  }, [currentQuestion, state])

  const handleStartQuiz = () => {
    if (!hasCompletedOnboarding) {
      router.push('/onboarding')
      return
    }

    setState('quiz')
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
    setResult(null)
  }

  const handleSelectOption = (index: number) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    const question = quizQuestions[currentQuestion]
    const updatedAnswer: QuizAnswer = {
      questionId: question.id,
      selectedIndex: selectedOption,
      domains: question.options[selectedOption].domains,
    }

    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestion] = updatedAnswer
    setAnswers(updatedAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      return
    }

    const domainScores: Record<string, number> = {}

    updatedAnswers.forEach((answer) => {
      answer.domains.forEach((domain) => {
        domainScores[domain] = (domainScores[domain] || 0) + 1
      })
    })

    const sortedDomains = Object.entries(domainScores)
      .sort(([, a], [, b]) => b - a)
      .map(([domain]) => domain)

    const quizResult = {
      primary: sortedDomains[0] || 'web-development',
      secondary: sortedDomains[1] || 'data-science',
    }

    setResult(quizResult)

    saveQuizResult({
      primaryDomain: quizResult.primary,
      secondaryDomain: quizResult.secondary,
      answers: updatedAnswers.map((a) => a.selectedIndex),
      completedAt: new Date().toISOString(),
    })

    setState('result')
  }

  const handlePrevious = () => {
    if (currentQuestion === 0) return
    setCurrentQuestion((prev) => prev - 1)
  }

  const handleRetakeQuiz = () => {
    setState('intro')
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
    setResult(null)
  }

  const handleViewRoadmap = () => {
    if (!result?.primary) return
    router.push(`/roadmaps/${result.primary}`)
  }

  const handleGoToOnboarding = () => {
    router.push('/onboarding')
  }

  const primaryDomain = result ? domains.find((d) => d.id === result.primary) : null
  const secondaryDomain = result ? domains.find((d) => d.id === result.secondary) : null

  if (!mounted || !profileChecked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading your quiz experience...</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!hasCompletedOnboarding && (
            <Card className="bg-card border-border mb-8">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <UserCheck className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold font-heading text-foreground mb-3">
                  Complete Onboarding First
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  To give you accurate career recommendations, Horizon Guide first needs your
                  year, branch, interests, and goals.
                </p>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleGoToOnboarding}
                >
                  Go to Onboarding
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {hasCompletedOnboarding && state === 'intro' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <ClipboardList className="h-10 w-10 text-primary" />
                </div>
              </div>

              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Career Discovery Quiz
              </Badge>

              <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
                Discover Your Ideal Career Domain
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Answer {quizQuestions.length} quick questions to find out which tech career path
                matches your interests, strengths, and working style.
              </p>

              <Card className="bg-card border-border mb-8">
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium text-foreground">Personalized Results</p>
                      <p className="text-sm text-muted-foreground">Based on your responses</p>
                    </div>

                    <div>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <ClipboardList className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium text-foreground">
                        {quizQuestions.length} Questions
                      </p>
                      <p className="text-sm text-muted-foreground">Quick and easy</p>
                    </div>

                    <div>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Map className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium text-foreground">Get Roadmap</p>
                      <p className="text-sm text-muted-foreground">Instant recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 glow-primary"
                onClick={handleStartQuiz}
              >
                Start Quiz
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          )}

          {hasCompletedOnboarding && state === 'quiz' && (
            <div>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <QuestionCard
                question={quizQuestions[currentQuestion].question}
                options={quizQuestions[currentQuestion].options}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirst={currentQuestion === 0}
                isLast={currentQuestion === quizQuestions.length - 1}
              />
            </div>
          )}

          {hasCompletedOnboarding && state === 'result' && primaryDomain && (
            <div className="space-y-6">
              <ResultSummary
                primaryDomain={primaryDomain as QuizDomain}
                secondaryDomain={secondaryDomain as QuizDomain | null}
                onRetake={handleRetakeQuiz}
              />

              <Card className="bg-card border-border">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Ready to view your recommended roadmap?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore the roadmap for {primaryDomain.name} and save it to your dashboard.
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shrink-0"
                    onClick={handleViewRoadmap}
                  >
                    View Recommended Roadmap
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}