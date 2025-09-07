"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileDown, ShoppingCart, Calendar, Bell } from "lucide-react"
import { MealsSection } from "./meals-section"
import { DailySummaryCard } from "./daily-summary-card"
import { DayInsightsPanel } from "./day-insights-panel"
import { SupplementsSection } from "./supplements-section"

export function NutritionPlanViewer() {
  const [selectedPlan, setSelectedPlan] = useState("muscle-gain")

  const nutritionPlans = [
    { id: "muscle-gain", name: "Muscle Gain Protocol", type: "Bulking", cost: "$45/week" },
    { id: "fat-loss", name: "Fat Loss Program", type: "Cutting", cost: "$38/week" },
    { id: "maintenance", name: "Maintenance Plan", type: "Balanced", cost: "$42/week" },
  ]

  const currentPlan = nutritionPlans.find((plan) => plan.id === selectedPlan)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Nutrition Plans</h1>

        {/* Plan Selector */}
        <Select value={selectedPlan} onValueChange={setSelectedPlan}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select nutrition plan" />
          </SelectTrigger>
          <SelectContent>
            {nutritionPlans.map((plan) => (
              <SelectItem key={plan.id} value={plan.id}>
                {plan.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plan Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {currentPlan?.name}
                <Badge variant="secondary">{currentPlan?.type}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Created March 1, 2024 • By Coach Sarah</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              {currentPlan?.cost}
            </Badge>
            <Badge variant="outline" className="text-xs">
              2,800 calories/day
            </Badge>
            <Badge variant="outline" className="text-xs">
              180g protein
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <FileDown className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Grocery List
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              Prep Reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailySummaryCard />
        <DayInsightsPanel />
      </div>

      {/* Supplements */}
      <SupplementsSection />

      {/* Meals Section */}
      <MealsSection />
    </div>
  )
}
