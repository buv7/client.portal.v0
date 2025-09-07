import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { HealthRingsWidget } from "@/components/dashboard/health-rings-widget"
import { ProgressMetricsCard } from "@/components/dashboard/progress-metrics-card"
import { UpcomingSessionCard } from "@/components/dashboard/upcoming-session-card"
import { SupplementTodayCard } from "@/components/dashboard/supplement-today-card"
import { StreakCard } from "@/components/dashboard/streak-card"
import { RankLevelCard } from "@/components/dashboard/rank-level-card"
import { AIUsageMeter } from "@/components/dashboard/ai-usage-meter"
import { QuickActionsGrid } from "@/components/dashboard/quick-actions-grid"
import { RecentActivityFeed } from "@/components/dashboard/recent-activity-feed"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile and Health Overview */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard />
            <HealthRingsWidget />
          </div>

          {/* Progress and Sessions */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressMetricsCard />
            <UpcomingSessionCard />
          </div>

          {/* Supplements and Streaks */}
          <div className="lg:col-span-1 space-y-6">
            <SupplementTodayCard />
            <StreakCard />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RankLevelCard />
          <AIUsageMeter />
          <QuickActionsGrid />
        </div>

        <RecentActivityFeed />
      </div>
    </DashboardLayout>
  )
}
