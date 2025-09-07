"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DailySummaryCard() {
  const macros = {
    calories: { current: 2340, target: 2800, color: "text-primary" },
    protein: { current: 165, target: 180, color: "text-accent" },
    carbs: { current: 280, target: 320, color: "text-chart-2" },
    fat: { current: 85, target: 95, color: "text-chart-4" },
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Donut Chart Visualization */}
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />

              {/* Calories progress */}
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${getProgressPercentage(macros.calories.current, macros.calories.target) * 2.2} 220`}
                className="text-primary"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold">{macros.calories.current}</div>
                <div className="text-xs text-muted-foreground">/{macros.calories.target}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Breakdown */}
        <div className="space-y-4">
          {Object.entries(macros).map(([key, macro]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{key}</span>
                <span className="text-muted-foreground">
                  {macro.current}/{macro.target}
                  {key === "calories" ? "" : "g"}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-current ${macro.color}`}
                  style={{ width: `${getProgressPercentage(macro.current, macro.target)}%` }}
                />
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {Math.round(getProgressPercentage(macro.current, macro.target))}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
