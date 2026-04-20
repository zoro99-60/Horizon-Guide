'use client'

export type Profile = {
  name: string
  email: string
  year: string
  branch: string
  interests: string[]
  targetRole?: string
  targetCompany?: string
  onboardingComplete: boolean
  goal?: 'internship' | 'placement' | 'both'
  currentSkillLevel?: 'beginner' | 'intermediate' | 'advanced'
  knownSkills?: string[]
  projectsCompleted?: number
}

export type QuizResult = {
  primaryDomain: string
  secondaryDomain?: string
  scoreMap?: Record<string, number>
  answers?: number[]
  completedAt: string
}

export type SavedRoadmap = {
  id: string
  domain?: string
  name?: string
  savedAt: string
  phases?: string[]
}

export type SkillProgress = {
  domain: string
  completedSkills: string[]
  inProgressSkills: string[]
}

const STORAGE_KEYS = {
  PROFILE: 'hg_profile',
  QUIZ_RESULT: 'hg_quiz_result',
  SAVED_ROADMAPS: 'hg_saved_roadmaps',
  SKILL_PROGRESS: 'hg_skill_progress',
  RESUME_CHECKLIST: 'hg_resume_checklist',
} as const

function isBrowser() {
  return typeof window !== 'undefined'
}

function safeRead<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback

  try {
    const data = localStorage.getItem(key)
    return data ? (JSON.parse(data) as T) : fallback
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return fallback
  }
}

function safeWrite<T>(key: string, value: T): void {
  if (!isBrowser()) return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error)
  }
}

// -------------------- Profile --------------------

export function getProfile(): Profile | null {
  return safeRead<Profile | null>(STORAGE_KEYS.PROFILE, null)
}

export function saveProfile(profile: Profile): void {
  safeWrite(STORAGE_KEYS.PROFILE, profile)
}

export function isOnboardingComplete(): boolean {
  const profile = getProfile()
  return !!profile?.onboardingComplete
}

// -------------------- Quiz Result --------------------

export function getQuizResult(): QuizResult | null {
  return safeRead<QuizResult | null>(STORAGE_KEYS.QUIZ_RESULT, null)
}

export function saveQuizResult(result: QuizResult): void {
  safeWrite(STORAGE_KEYS.QUIZ_RESULT, result)
}

// -------------------- Saved Roadmaps --------------------

export function getSavedRoadmaps(): SavedRoadmap[] {
  return safeRead<SavedRoadmap[]>(STORAGE_KEYS.SAVED_ROADMAPS, [])
}

export function saveRoadmap(roadmap: SavedRoadmap): void {
  const roadmaps = getSavedRoadmaps()
  const exists = roadmaps.some((r) => r.id === roadmap.id)

  if (!exists) {
    const updatedRoadmaps = [...roadmaps, roadmap]
    safeWrite(STORAGE_KEYS.SAVED_ROADMAPS, updatedRoadmaps)
  }
}

export function removeRoadmap(roadmapId: string): void {
  const roadmaps = getSavedRoadmaps()
  const updatedRoadmaps = roadmaps.filter((r) => r.id !== roadmapId)
  safeWrite(STORAGE_KEYS.SAVED_ROADMAPS, updatedRoadmaps)
}

export function hasSavedRoadmap(roadmapId: string): boolean {
  const roadmaps = getSavedRoadmaps()
  return roadmaps.some((r) => r.id === roadmapId)
}

// -------------------- Skill Progress --------------------

export function getSkillProgress(): Record<string, SkillProgress> {
  return safeRead<Record<string, SkillProgress>>(STORAGE_KEYS.SKILL_PROGRESS, {})
}

export function saveSkillProgress(progress: SkillProgress): void {
  const allProgress = getSkillProgress()
  allProgress[progress.domain] = progress
  safeWrite(STORAGE_KEYS.SKILL_PROGRESS, allProgress)
}

export function getDomainSkillProgress(domainId: string): SkillProgress | null {
  const allProgress = getSkillProgress()
  return allProgress[domainId] || null
}

// -------------------- Resume Checklist --------------------

export function getResumeChecklist(): number[] {
  return safeRead<number[]>(STORAGE_KEYS.RESUME_CHECKLIST, [])
}

export function saveResumeChecklist(checkedItems: number[]): void {
  safeWrite(STORAGE_KEYS.RESUME_CHECKLIST, checkedItems)
}

// -------------------- Reset / Clear --------------------

export function clearSession(): void {
  if (!isBrowser()) return

  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key)
  })
}

export function resetAllData(): void {
  clearSession()
}