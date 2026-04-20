import { AppSidebar } from '@/components/app-sidebar'

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar variant="faculty" />
      <div className="lg:pl-64 transition-all duration-300">
        {children}
      </div>
    </div>
  )
}
