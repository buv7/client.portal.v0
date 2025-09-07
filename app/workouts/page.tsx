import { WorkoutPlanViewer } from "@/components/workouts/workout-plan-viewer"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function WorkoutsPage() {
  return (
    <DashboardLayout>
      <WorkoutPlanViewer />
    </DashboardLayout>
  )
}
