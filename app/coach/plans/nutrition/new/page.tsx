"use client"
import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { NutritionPlanBuilder } from "@/components/coach/nutrition-plan-builder"

export default function NewNutritionPlanPage() {
  return (
    <CoachDashboardLayout>
      <div className="p-6">
        <NutritionPlanBuilder />
      </div>
    </CoachDashboardLayout>
  )
}
