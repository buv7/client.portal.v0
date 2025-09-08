import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { ProgressOverview } from "@/components/coach/progress-overview"

export default function CoachProgressPage() {
  return (
    <CoachDashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Progress Overview</h1>
            <p className="text-muted-foreground">Monitor all client progress and achievements</p>
          </div>
        </div>

        <ProgressOverview />
      </div>
    </CoachDashboardLayout>
  )
}
