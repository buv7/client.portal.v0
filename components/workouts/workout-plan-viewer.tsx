"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Play, Share, Edit, FileDown, Camera } from "lucide-react"
import { WeekNavigation } from "./week-navigation"
import { ExerciseList } from "./exercise-list"

export function WorkoutPlanViewer() {
  const [selectedPlan, setSelectedPlan] = useState("strength-building")
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const workoutPlans = [
    { id: "strength-building", name: "Strength Building Program", weeks: 8 },
    { id: "fat-loss", name: "Fat Loss Circuit", weeks: 6 },
    { id: "muscle-gain", name: "Muscle Gain Protocol", weeks: 12 },
  ]

  const currentPlan = workoutPlans.find((plan) => plan.id === selectedPlan)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Workout Plans</h1>

        {/* Plan Selector */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Select workout plan" />
            </SelectTrigger>
            <SelectContent>
              {workoutPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Plan Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {currentPlan?.name}
                <Badge variant="secondary">Week {selectedWeek}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {currentPlan?.weeks} week program • Created by Coach Sarah
              </p>
            </div>

            {/* Music Button */}
            <Button variant="outline" size="sm" className="bg-transparent">
              <Play className="w-4 h-4 mr-2" />
              Play Music
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week Navigation */}
          <WeekNavigation
            currentWeek={selectedWeek}
            totalWeeks={currentPlan?.weeks || 8}
            onWeekChange={setSelectedWeek}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Camera className="w-4 h-4 mr-2" />
              Cardio Log
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              Edit Plan
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <FileDown className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <ExerciseList week={selectedWeek} searchQuery={searchQuery} />
    </div>
  )
}
