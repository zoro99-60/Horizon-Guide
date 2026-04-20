import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TestimonialCard } from '@/components/ui-components'
import { testimonials, stats } from '@/data/mockData'
import Link from 'next/link'
import {
  Sparkles,
  Target,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Building2,
  Lightbulb,
} from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Student-First Approach',
    description: 'Every feature is designed with the engineering student in mind, addressing real challenges faced during the journey from freshman to professional.',
  },
  {
    icon: BookOpen,
    title: 'Structured Learning',
    description: 'We believe in systematic, phase-wise learning that builds strong foundations before advancing to complex topics.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Learning is better together. Our platform fosters peer connections, mentorship, and collaborative growth.',
  },
  {
    icon: Award,
    title: 'Industry Aligned',
    description: 'Our roadmaps and resources are constantly updated to match current industry demands and hiring trends.',
  },
]

const team = [
  {
    name: 'Prof. Rajesh Kumar',
    role: 'Faculty Advisor',
    description: 'Head of Placement Cell with 15+ years of experience in student career development.',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Academic Coordinator',
    description: 'Associate Professor specializing in curriculum development and industry partnerships.',
  },
  {
    name: 'Amit Verma',
    role: 'Industry Mentor',
    description: 'Senior Software Engineer at Google, alumni and active contributor to student mentorship.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                About Horizon Guide
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
                Empowering Engineering Students to{' '}
                <span className="gradient-text">Build Successful Careers</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Horizon Guide is a comprehensive career development platform designed specifically 
                for engineering students. We provide personalized roadmaps, skill tracking, and 
                resources to help students navigate from their first year to successful placement.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold font-heading text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Our Mission</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6">
                  Bridging the Gap Between Education and Industry
                </h2>
                <p className="text-muted-foreground mb-6">
                  We recognized that many engineering students struggle to connect their 
                  academic learning with industry requirements. The gap between what&apos;s 
                  taught in classrooms and what companies expect can be overwhelming.
                </p>
                <p className="text-muted-foreground mb-6">
                  Horizon Guide bridges this gap by providing clear, actionable roadmaps 
                  that show students exactly what to learn, when to learn it, and how to 
                  apply it through real projects. Our platform adapts to each student&apos;s 
                  pace and goals, ensuring personalized guidance throughout their journey.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>For 1st to 4th Year Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>50+ Partner Companies</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card border-border p-6 text-center">
                  <Target className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Clear Direction</h3>
                  <p className="text-sm text-muted-foreground">Know exactly what to focus on</p>
                </Card>
                <Card className="bg-card border-border p-6 text-center">
                  <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Curated Resources</h3>
                  <p className="text-sm text-muted-foreground">Best learning materials</p>
                </Card>
                <Card className="bg-card border-border p-6 text-center">
                  <Lightbulb className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Project Ideas</h3>
                  <p className="text-sm text-muted-foreground">Build your portfolio</p>
                </Card>
                <Card className="bg-card border-border p-6 text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">Learn with peers</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Our Values</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
                What We Believe In
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <Card key={value.title} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Success Stories</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
                Hear From Our Students
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  role={testimonial.role}
                  quote={testimonial.quote}
                  domain={testimonial.domain}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Our Team</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
                Meet the People Behind Horizon Guide
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member) => (
                <Card key={member.name} className="bg-card border-border text-center">
                  <CardContent className="p-6">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <Badge variant="secondary" className="mb-4">Contact Us</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about Horizon Guide? Want to partner with us? 
                  We&apos;d love to hear from you. Reach out through any of the 
                  channels below.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">support@horizonguide.edu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">Engineering College Campus, City</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4 font-heading">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of engineering students who are building 
                    successful careers with Horizon Guide.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/quiz">
                      <Button className="bg-primary hover:bg-primary/90">
                        Take Career Quiz
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/onboarding">
                      <Button variant="outline">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
