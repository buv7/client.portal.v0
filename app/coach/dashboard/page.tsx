"use client"

import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { CoachDashboardHeader } from "@/components/coach/coach-dashboard-header"
import { CoachAnalyticsSummary } from "@/components/coach/coach-analytics-summary"
import { CoachInbox } from "@/components/coach/coach-inbox"
import { CoachClientsOverview } from "@/components/coach/coach-clients-overview"
import { CoachPendingRequests } from "@/components/coach/coach-pending-requests"
import { CoachRecentCheckins } from "@/components/coach/coach-recent-checkins"
import { CoachUpcomingSessions } from "@/components/coach/coach-upcoming-sessions"
import { CoachQuickActions } from "@/components/coach/coach-quick-actions"

export default function CoachDashboardPage() {
  return (
    <CoachDashboardLayout>
      <div className="space-y-6 p-6">
        <CoachDashboardHeader />

        {/* Analytics Section */}
        <CoachAnalyticsSummary />

        {/* Critical Coach Inbox */}
        <CoachInbox />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CoachClientsOverview />
          <CoachPendingRequests />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CoachRecentCheckins />
          <CoachUpcomingSessions />
        </div>

        {/* Quick Actions */}
        <CoachQuickActions />
      </div>
    </CoachDashboardLayout>
  )
}
