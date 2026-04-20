export const stats = [
  { label: 'Active Students', value: '10K+' },
  { label: 'Career Domains', value: '7+' },
  { label: 'Skills Tracked', value: '250+' },
  { label: 'Success Stories', value: '500+' },
]

export function StatsSection() {
  return (
    <section className="py-16 border-y border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="relative">
                <p className="text-4xl sm:text-5xl font-bold font-heading text-foreground mb-2 transition-transform group-hover:scale-105">
                  <span className="gradient-text">{stat.value}</span>
                </p>
                <p className="text-sm lg:text-base text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
