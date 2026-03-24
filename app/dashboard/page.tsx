import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { SkillsChecklist } from "@/components/dashboard/skills-checklist"
import { SavedRoadmaps } from "@/components/dashboard/saved-roadmaps"
import { RecommendedNext } from "@/components/dashboard/recommended-next"
import { TwoFactorSetup } from "@/components/dashboard/two-factor-setup"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth/login")
  }

  // Fetch profile if needed
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  // Fetch roadmaps
  const { data: roadmaps } = await supabase
    .from("roadmaps")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch latest quiz result
  const { data: latestQuiz } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track your learning progress and stay on top of your career goals.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Stats row */}
        <ProgressOverview />

        {/* Charts + Saved Roadmaps */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          <div>
            <SavedRoadmaps roadmaps={roadmaps || []} />
          </div>
        </div>

        {/* Skills + Recommended */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SkillsChecklist />
          <div className="space-y-6">
            <TwoFactorSetup userId={user.id} />
            <RecommendedNext latestQuiz={latestQuiz} />
          </div>
        </div>
      </div>
    </div>
  )
}
