"use client"
import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { WorkoutPlanBuilder } from "@/components/coach/workout-plan-builder"

export default function NewWorkoutPlanPage() {
  return (
    <CoachDashboardLayout>
      <div className="p-6">
        <WorkoutPlanBuilder />
      </div>
    </CoachDashboardLayout>
  )
}
