'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { saveProfile, getProfile, type Profile } from '@/lib/store'
import { domains } from '@/data/mockData'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Heart,
  Target,
  Code,
  CheckCircle2,
} from 'lucide-react'

const steps = [
  { id: 1, title: 'Basic Info', icon: User },
  { id: 2, title: 'Interests', icon: Heart },
  { id: 3, title: 'Goals', icon: Target },
  { id: 4, title: 'Skills', icon: Code },
  { id: 5, title: 'Summary', icon: CheckCircle2 },
]

const branches = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Chemical',
  'Other',
]

const skillLevels = [
  { value: 'beginner', label: 'Beginner', description: 'Just starting out, learning basics' },
  { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with fundamentals' },
  { value: 'advanced', label: 'Advanced', description: 'Strong skills, built projects' },
]

const commonSkills = [
  'Python',
  'JavaScript',
  'Java',
  'C++',
  'HTML/CSS',
  'React',
  'Node.js',
  'SQL',
  'Git',
  'Data Structures',
  'Machine Learning',
  'Linux',
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: 1,
    branch: '',
    preferredDomains: [] as string[],
    dreamRole: '',
    dreamCompany: '',
    goal: 'both' as 'internship' | 'placement' | 'both',
    currentSkillLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    knownSkills: [] as string[],
    projectsCompleted: 0,
  })

  useEffect(() => {
    const existingProfile = getProfile()
    if (!existingProfile) return

    setFormData((prev) => ({
      ...prev,
      name: existingProfile.name || '',
      email: existingProfile.email || '',
      year: existingProfile.year ? Number(existingProfile.year) : 1,
      branch: existingProfile.branch || '',
      preferredDomains: existingProfile.interests || [],
      dreamRole: existingProfile.targetRole || '',
      dreamCompany: existingProfile.targetCompany || '',
      goal: (existingProfile.goal as 'internship' | 'placement' | 'both') || 'both',
      currentSkillLevel: (existingProfile.currentSkillLevel as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
      knownSkills: existingProfile.knownSkills || [],
      projectsCompleted: existingProfile.projectsCompleted || 0,
    }))
  }, [])

  const progress = (currentStep / steps.length) * 100

  const updateFormData = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleArrayItem = (key: 'preferredDomains' | 'knownSkills', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter((i) => i !== item)
        : [...prev[key], item],
    }))
  }

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleNext = () => {
    if (currentStep < steps.length && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    const profile: Profile = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      year: formData.year.toString(),
      branch: formData.branch,
      interests: formData.preferredDomains,
      targetRole: formData.dreamRole.trim(),
      targetCompany: formData.dreamCompany.trim(),
      goal: formData.goal,
      currentSkillLevel: formData.currentSkillLevel,
      knownSkills: formData.knownSkills,
      projectsCompleted: formData.projectsCompleted,
      onboardingComplete: true,
    }

    saveProfile(profile)
    router.push('/quiz')
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name.trim().length > 1 &&
          isValidEmail(formData.email) &&
          formData.branch.trim().length > 0
        )
      case 2:
        return formData.preferredDomains.length > 0 && formData.preferredDomains.length <= 3
      case 3:
        return formData.dreamRole.trim().length > 1 && !!formData.goal
      case 4:
        return !!formData.currentSkillLevel
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold font-heading">Horizon Guide</span>
          </div>
          <p className="text-muted-foreground">Let&apos;s personalize your career journey</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-center h-10 w-10 rounded-full transition-all ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl font-heading">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Tell us a bit about yourself'}
              {currentStep === 2 && 'What are you interested in?'}
              {currentStep === 3 && 'What are your career goals?'}
              {currentStep === 4 && 'What is your current skill level?'}
              {currentStep === 5 && 'Review your information'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your.email@college.edu"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                  {formData.email.length > 0 && !isValidEmail(formData.email) && (
                    <p className="text-xs text-red-400 mt-1">Please enter a valid email address</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Current Year</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => updateFormData('year', year)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          formData.year === year
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {year}
                        {year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Branch / Department</label>
                  <div className="grid grid-cols-2 gap-2">
                    {branches.map((branch) => (
                      <button
                        key={branch}
                        type="button"
                        onClick={() => updateFormData('branch', branch)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          formData.branch === branch
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Select domains you&apos;re interested in (choose 1-3)
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {domains.map((domain) => (
                      <button
                        key={domain.id}
                        type="button"
                        onClick={() => {
                          const alreadySelected = formData.preferredDomains.includes(domain.id)
                          if (!alreadySelected && formData.preferredDomains.length >= 3) return
                          toggleArrayItem('preferredDomains', domain.id)
                        }}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          formData.preferredDomains.includes(domain.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-muted/30 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${domain.color}20` }}
                          >
                            <span style={{ color: domain.color }}>{domain.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p
                              className={`font-medium ${
                                formData.preferredDomains.includes(domain.id)
                                  ? 'text-primary'
                                  : 'text-foreground'
                              }`}
                            >
                              {domain.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{domain.demand} demand</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Selected: {formData.preferredDomains.length}/3
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Dream Role</label>
                  <Input
                    placeholder="e.g., Software Engineer, Data Scientist"
                    value={formData.dreamRole}
                    onChange={(e) => updateFormData('dreamRole', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Dream Company (Optional)
                  </label>
                  <Input
                    placeholder="e.g., Google, Microsoft, Amazon"
                    value={formData.dreamCompany}
                    onChange={(e) => updateFormData('dreamCompany', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    What&apos;s your primary goal?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'internship', label: 'Internship' },
                      { value: 'placement', label: 'Placement' },
                      { value: 'both', label: 'Both' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          updateFormData(
                            'goal',
                            option.value as 'internship' | 'placement' | 'both'
                          )
                        }
                        className={`p-4 rounded-lg border text-center transition-all ${
                          formData.goal === option.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    What&apos;s your current skill level?
                  </label>
                  <div className="space-y-3">
                    {skillLevels.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() =>
                          updateFormData(
                            'currentSkillLevel',
                            level.value as 'beginner' | 'intermediate' | 'advanced'
                          )
                        }
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          formData.currentSkillLevel === level.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-muted/30 hover:border-primary/50'
                        }`}
                      >
                        <p
                          className={`font-medium ${
                            formData.currentSkillLevel === level.value
                              ? 'text-primary'
                              : 'text-foreground'
                          }`}
                        >
                          {level.label}
                        </p>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Skills you already know (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleArrayItem('knownSkills', skill)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          formData.knownSkills.includes(skill)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Projects completed so far
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => updateFormData('projectsCompleted', num)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          formData.projectsCompleted === num
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {num === 5 ? '5+' : num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year & Branch</span>
                    <span className="font-medium text-foreground">
                      {formData.year}
                      {formData.year === 1
                        ? 'st'
                        : formData.year === 2
                        ? 'nd'
                        : formData.year === 3
                        ? 'rd'
                        : 'th'}{' '}
                      Year, {formData.branch}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dream Role</span>
                    <span className="font-medium text-foreground">{formData.dreamRole}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="font-medium text-foreground capitalize">{formData.goal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skill Level</span>
                    <span className="font-medium text-foreground capitalize">
                      {formData.currentSkillLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projects Completed</span>
                    <span className="font-medium text-foreground">{formData.projectsCompleted}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Preferred Domains</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.preferredDomains.map((domainId) => {
                      const domain = domains.find((d) => d.id === domainId)
                      return domain ? (
                        <Badge key={domainId} variant="secondary">
                          {domain.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>

                {formData.knownSkills.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Known Skills</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.knownSkills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={handleNext} disabled={!canProceed()} className="bg-primary hover:bg-primary/90">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete} className="bg-primary hover:bg-primary/90 glow-primary">
                  Complete Setup
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}