'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getProfile, getQuizResult, getSavedRoadmaps, getSkillProgress, clearSession } from '@/lib/store'
import { domains } from '@/data/mockData'
import {
  User,
  Mail,
  GraduationCap,
  Target,
  Briefcase,
  Building2,
  Code,
  Sparkles,
  BookOpen,
  Map,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null)
  const [quizResult, setQuizResult] = useState<ReturnType<typeof getQuizResult>>(null)
  const [savedRoadmaps, setSavedRoadmaps] = useState<ReturnType<typeof getSavedRoadmaps>>([])
  const [skillProgress, setSkillProgress] = useState<ReturnType<typeof getSkillProgress>>({})
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
    setQuizResult(getQuizResult())
    setSavedRoadmaps(getSavedRoadmaps())
    setSkillProgress(getSkillProgress())
    setMounted(true)
  }, [])

  const handleReset = () => {
    clearSession()
    router.push('/')
  }

  if (!mounted) return null

  const totalCompleted = Object.values(skillProgress).reduce(
    (acc, p) => acc + (p.completedSkills?.length || 0), 0
  )

  const primaryDomain = quizResult?.primaryDomain
    ? domains.find((d) => d.id === quizResult.primaryDomain)
    : null

  if (!profile) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Card className="bg-card border-border">
          <CardContent className="p-10 text-center">
            <User className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Profile Found</h3>
            <p className="text-muted-foreground mb-6">Complete onboarding to set up your profile.</p>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push('/onboarding')}>
              Go to Onboarding
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const yearLabel = (y: string) => {
    const n = Number(y)
    return `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} Year`
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground">View and manage your Horizon Guide profile</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow icon={User} label="Name" value={profile.name} />
              <InfoRow icon={Mail} label="Email" value={profile.email} />
              <InfoRow icon={GraduationCap} label="Year" value={yearLabel(profile.year)} />
              <InfoRow icon={BookOpen} label="Branch" value={profile.branch} />
              <InfoRow icon={Target} label="Goal" value={profile.goal || '—'} />
              <InfoRow icon={Code} label="Skill Level" value={profile.currentSkillLevel || '—'} />
              <InfoRow icon={Briefcase} label="Dream Role" value={profile.targetRole || '—'} />
              <InfoRow icon={Building2} label="Dream Company" value={profile.targetCompany || '—'} />
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Preferred Domains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(profile.interests || []).map((domainId) => {
                const domain = domains.find((d) => d.id === domainId)
                return (
                  <Badge key={domainId} variant="secondary" className="text-sm py-1 px-3">
                    {domain?.name || domainId}
                  </Badge>
                )
              })}
              {(profile.interests || []).length === 0 && (
                <p className="text-sm text-muted-foreground">No domains selected</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Known Skills */}
        {(profile.knownSkills || []).length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Known Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.knownSkills!.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Progress Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{savedRoadmaps.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Saved Roadmaps</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-success">{totalCompleted}</p>
                <p className="text-xs text-muted-foreground mt-1">Skills Completed</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{profile.projectsCompleted || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Projects Completed</p>
              </div>
            </div>

            {primaryDomain && (
              <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-foreground">
                  Quiz recommended: <span className="font-semibold text-primary">{primaryDomain.name}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Reset all data including profile, quiz results, saved roadmaps, and skill progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showResetConfirm ? (
              <Button
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={() => setShowResetConfirm(true)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All Data
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <p className="text-sm text-red-400">Are you sure? This cannot be undone.</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleReset}
                >
                  Confirm Reset
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
      <Icon className="h-4 w-4 text-primary flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground capitalize truncate">{value}</p>
      </div>
    </div>
  )
}
