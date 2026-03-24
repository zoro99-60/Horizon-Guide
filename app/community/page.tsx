"use client"

import { useEffect, useState } from "react"
import { discussions as mockDiscussions, domains } from "@/lib/mock-data"
import { api } from "@/lib/api-client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Star, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [discussions, setDiscussions] = useState(mockDiscussions)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getDiscussions(activeFilter)
        if (data && data.length > 0) setDiscussions(data)
      } catch (error) {
        console.error("Failed to fetch discussions:", error)
      }
    }
    loadData()
  }, [activeFilter])

  const featuredDiscussions = discussions.filter((d) => d.featured)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 page-enter">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Community
          </h1>
          <p className="mt-2 text-muted-foreground">
            Connect with fellow engineering students, share knowledge, and grow together.
          </p>
        </div>
        <Button className="gap-2 self-start transition-all hover:scale-105 active:scale-95" disabled>
          <Plus className="h-4 w-4" />
          Start Discussion
        </Button>
      </div>

      {/* Domain Groups */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 stagger-children animate-fade-up delay-150">
        {domains.map((domain) => {
          const Icon = domain.icon
          const isActive = activeFilter === domain.title
          return (
            <Card
              key={domain.id}
              className={cn(
                "reveal is-visible cursor-pointer border transition-all duration-200 hover-lift press-effect",
                isActive
                  ? "border-primary/50 bg-primary/5 shadow-sm shadow-primary/10"
                  : "hover:border-primary/30"
              )}
              onClick={() =>
                setActiveFilter(activeFilter === domain.title ? "all" : domain.title)
              }
            >
              <CardContent className="flex flex-col items-center p-4 text-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300",
                    domain.bgClass,
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )}
                >
                  <Icon className={cn("h-5 w-5", domain.colorClass)} />
                </div>
                <p className="mt-2 text-xs font-medium text-foreground line-clamp-1">
                  {domain.title}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" className="gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            All Discussions
          </TabsTrigger>
          <TabsTrigger value="featured" className="gap-1.5">
            <Star className="h-3.5 w-3.5" />
            Featured
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 animate-fade-in">
          {activeFilter !== "all" && (
            <div className="mb-4 flex items-center gap-2 animate-slide-down">
              <span className="text-sm text-muted-foreground">Filtering by:</span>
              <Badge variant="secondary">{activeFilter}</Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs hover:text-primary transition-colors"
                onClick={() => setActiveFilter("all")}
              >
                Clear
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-3 stagger-children">
            {discussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
            {discussions.length === 0 && (
              <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-center animate-fade-in">
                <p className="text-sm text-muted-foreground">
                  No discussions found for this domain.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6 animate-fade-in">
          <div className="flex flex-col gap-3 stagger-children">
            {featuredDiscussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DiscussionCard({
  discussion,
}: {
  discussion: any
}) {
  return (
    <Card className="reveal is-visible group border bg-card transition-all duration-200 hover:border-primary/30 hover-lift press-effect cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9 shrink-0 ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary/20 group-hover:scale-105">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {discussion.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                {discussion.title}
              </h3>
              {discussion.featured && (
                <Star className="h-4 w-4 shrink-0 fill-primary text-primary transition-transform duration-300 group-hover:scale-125" />
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {discussion.preview}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs transition-all hover:border-primary/40 hover:text-primary">
                {discussion.domain}
              </Badge>
              <span className="text-xs text-muted-foreground">by {discussion.author}</span>
              <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3" />
                {discussion.replies}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
