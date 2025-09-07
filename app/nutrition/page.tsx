import { NutritionPlanViewer } from "@/components/nutrition/nutrition-plan-viewer"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function NutritionPage() {
  return (
    <DashboardLayout>
      <NutritionPlanViewer />
    </DashboardLayout>
  )
}
