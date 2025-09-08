"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Weight, Activity, Target } from "lucide-react"

interface ClientProgressChartsProps {
  clientId: string
}

export function ClientProgressCharts({ clientId }: ClientProgressChartsProps) {
  // Mock progress data
  const progressData = {
    weight: {
      current: 185.2,
      change: +8.5,
      trend: "up",
      history: [176.7, 178.2, 180.1, 182.3, 183.8, 185.2],
    },
    strength: {
      benchPress: { current: 225, change: +25, trend: "up" },
      squat: { current: 315, change: +35, trend: "up" },
      deadlift: { current: 405, change: +45, trend: "up" },
    },
    compliance: {
      workouts: 86,
      nutrition: 78,
      overall: 82,
    },
    measurements: {
      chest: { current: 42, change: +2, unit: "inches" },
      waist: { current: 32, change: -1, unit: "inches" },
      arms: { current: 15.5, change: +1.5, unit: "inches" },
    },
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-primary" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    )
  }

  const getComplianceColor = (value: number) => {
    if (value >= 80) return "text-primary"
    if (value >= 60) return "text-accent"
    return "text-destructive"
  }

  return (
    <div className="space-y-6">
      {/* Weight Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Weight className="h-5 w-5" />
            <span>Weight Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Current Weight</p>
              <p className="text-2xl font-bold">{progressData.weight.current} lbs</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Change</p>
              <div className="flex items-center justify-center space-x-1">
                <p className="text-2xl font-bold text-primary">+{progressData.weight.change} lbs</p>
                {getTrendIcon(progressData.weight.trend)}
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Goal Progress</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strength Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Strength Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Bench Press</h4>
                <Badge variant="outline">+{progressData.strength.benchPress.change} lbs</Badge>
              </div>
              <p className="text-2xl font-bold">{progressData.strength.benchPress.current} lbs</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Squat</h4>
                <Badge variant="outline">+{progressData.strength.squat.change} lbs</Badge>
              </div>
              <p className="text-2xl font-bold">{progressData.strength.squat.current} lbs</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Deadlift</h4>
                <Badge variant="outline">+{progressData.strength.deadlift.change} lbs</Badge>
              </div>
              <p className="text-2xl font-bold">{progressData.strength.deadlift.current} lbs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Compliance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Workout Compliance</p>
              <p className={`text-2xl font-bold ${getComplianceColor(progressData.compliance.workouts)}`}>
                {progressData.compliance.workouts}%
              </p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Nutrition Compliance</p>
              <p className={`text-2xl font-bold ${getComplianceColor(progressData.compliance.nutrition)}`}>
                {progressData.compliance.nutrition}%
              </p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Overall Compliance</p>
              <p className={`text-2xl font-bold ${getComplianceColor(progressData.compliance.overall)}`}>
                {progressData.compliance.overall}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body Measurements */}
      <Card>
        <CardHeader>
          <CardTitle>Body Measurements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Chest</h4>
                <Badge className="bg-primary text-primary-foreground">+{progressData.measurements.chest.change}"</Badge>
              </div>
              <p className="text-xl font-bold">
                {progressData.measurements.chest.current} {progressData.measurements.chest.unit}
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Waist</h4>
                <Badge className="bg-primary text-primary-foreground">{progressData.measurements.waist.change}"</Badge>
              </div>
              <p className="text-xl font-bold">
                {progressData.measurements.waist.current} {progressData.measurements.waist.unit}
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Arms</h4>
                <Badge className="bg-primary text-primary-foreground">+{progressData.measurements.arms.change}"</Badge>
              </div>
              <p className="text-xl font-bold">
                {progressData.measurements.arms.current} {progressData.measurements.arms.unit}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
