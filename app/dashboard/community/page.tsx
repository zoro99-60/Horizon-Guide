'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { discussions as mockDiscussions } from '@/data/mockData'
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Clock,
  Search,
  Tag,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  Award,
  Pin,
  Brain,
  Globe,
  BarChart3,
  Shield,
  Briefcase,
  FileText,
  Flame,
  Plus,
} from 'lucide-react'

const categories = [
  { id: 'all', label: 'All', icon: MessageSquare },
  { id: 'Web Dev', label: 'Web Dev', icon: Globe },
  { id: 'AI/ML', label: 'AI/ML', icon: Brain },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: Shield },
  { id: 'Placements', label: 'Placements', icon: Award },
  { id: 'Internships', label: 'Internships', icon: Briefcase },
  { id: 'Resume', label: 'Resume', icon: FileText },
  { id: 'Projects', label: 'Projects', icon: Lightbulb },
  { id: 'Help', label: 'Help', icon: HelpCircle },
]

// Extended discussions with more content
const allDiscussions = [
  ...mockDiscussions,
  {
    id: 6,
    title: 'Resume review — does my frontend project section look good?',
    author: 'Anita Sharma',
    category: 'Resume',
    replies: 18,
    likes: 42,
    time: '6 hours ago',
    pinned: false,
  },
  {
    id: 7,
    title: 'Best open source projects for beginners to contribute to?',
    author: 'Karan Mehta',
    category: 'Projects',
    replies: 45,
    likes: 98,
    time: '1 day ago',
    pinned: false,
  },
  {
    id: 8,
    title: 'How to prepare for Infosys InfyTQ — tips from placed students',
    author: 'Divya Rajan',
    category: 'Placements',
    replies: 72,
    likes: 205,
    time: '2 days ago',
    pinned: true,
  },
  {
    id: 9,
    title: 'Need help with deploying a MERN app on AWS',
    author: 'Saurabh Patel',
    category: 'Help',
    replies: 12,
    likes: 23,
    time: '3 hours ago',
    pinned: false,
  },
  {
    id: 10,
    title: 'Summer internship at Flipkart — my experience and learnings',
    author: 'Meera Kulkarni',
    category: 'Internships',
    replies: 134,
    likes: 287,
    time: '4 days ago',
    pinned: true,
  },
]

const categoryColors: Record<string, string> = {
  'Web Dev': 'bg-blue-500/15 text-blue-400',
  'AI/ML': 'bg-purple-500/15 text-purple-400',
  'Cybersecurity': 'bg-red-500/15 text-red-400',
  'Placements': 'bg-amber-500/15 text-amber-400',
  'Internships': 'bg-success/15 text-success',
  'Resume': 'bg-primary/15 text-primary',
  'Projects': 'bg-cyan-500/15 text-cyan-400',
  'Help': 'bg-orange-500/15 text-orange-400',
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pinnedDiscussions = useMemo(() => {
    return allDiscussions.filter((d) => d.pinned).sort((a, b) => b.likes - a.likes)
  }, [])

  const filtered = useMemo(() => {
    let result = allDiscussions.filter((d) => !d.pinned)

    if (activeCategory !== 'all') {
      result = result.filter((d) => d.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [searchQuery, activeCategory])

  const trendingDiscussions = useMemo(() => {
    return [...allDiscussions]
      .filter((d) => !d.pinned)
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Community</h1>
            <p className="text-sm text-muted-foreground">Discuss, learn, and help fellow engineering students</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Start Discussion
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="pl-11 h-11 bg-card border-border"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Pinned Posts */}
          {activeCategory === 'all' && pinnedDiscussions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Pin className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Pinned Posts</h2>
              </div>
              <div className="space-y-3">
                {pinnedDiscussions.map((d) => (
                  <DiscussionCard key={d.id} discussion={d} isPinned />
                ))}
              </div>
            </div>
          )}

          {/* Discussions */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">
              {activeCategory === 'all' ? 'Recent Discussions' : `${activeCategory} Discussions`}
            </h2>
            <div className="space-y-3">
              {filtered.map((d) => (
                <DiscussionCard key={d.id} discussion={d} />
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <Card className="bg-card border-border">
              <CardContent className="p-10 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No discussions found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeCategory !== 'all'
                    ? `No discussions in "${activeCategory}" yet. Be the first to start one!`
                    : 'Try a different search query.'}
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Start a Discussion
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending */}
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-foreground">Trending This Week</h3>
              </div>
              <div className="space-y-3">
                {trendingDiscussions.map((d, idx) => (
                  <div
                    key={d.id}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <span className="text-lg font-bold text-muted-foreground/40 w-6 text-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {d.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-2.5 w-2.5" />
                          {d.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-2.5 w-2.5" />
                          {d.replies}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-background/60 border border-border p-3 text-center">
                  <p className="text-lg font-bold text-foreground">1.2K</p>
                  <p className="text-[10px] text-muted-foreground">Members</p>
                </div>
                <div className="rounded-lg bg-background/60 border border-border p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{allDiscussions.length * 12}</p>
                  <p className="text-[10px] text-muted-foreground">Discussions</p>
                </div>
                <div className="rounded-lg bg-background/60 border border-border p-3 text-center">
                  <p className="text-lg font-bold text-foreground">89%</p>
                  <p className="text-[10px] text-muted-foreground">Reply Rate</p>
                </div>
                <div className="rounded-lg bg-background/60 border border-border p-3 text-center">
                  <p className="text-lg font-bold text-foreground">4.2h</p>
                  <p className="text-[10px] text-muted-foreground">Avg Response</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Be respectful and constructive
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Share specific, actionable advice
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  No spam or self-promotion
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Use categories for better visibility
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DiscussionCard({ discussion, isPinned }: { discussion: (typeof allDiscussions)[0]; isPinned?: boolean }) {
  return (
    <Card
      className={`bg-card border-border hover:border-primary/50 transition-all group cursor-pointer ${
        isPinned ? 'ring-1 ring-primary/20 bg-primary/[0.03]' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center text-[11px] font-bold text-foreground flex-shrink-0">
            {discussion.author
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {isPinned && <Pin className="h-3 w-3 text-primary inline mr-1.5 -mt-0.5" />}
                {discussion.title}
              </h3>
              <Badge
                className={`text-[10px] shrink-0 ${
                  categoryColors[discussion.category] || 'bg-muted text-muted-foreground'
                }`}
              >
                {discussion.category}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/70">{discussion.author}</span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                {discussion.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {discussion.replies} replies
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {discussion.time}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
