"use client"
import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { CoachThreadsScreen } from "@/components/coach/coach-threads-screen"

export default function CoachMessagesPage() {
  return (
    <CoachDashboardLayout>
      <div className="h-[calc(100vh-4rem)]">
        <CoachThreadsScreen />
      </div>
    </CoachDashboardLayout>
  )
}
