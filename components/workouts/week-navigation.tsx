"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WeekNavigationProps {
  currentWeek: number
  totalWeeks: number
  onWeekChange: (week: number) => void
}

export function WeekNavigation({ currentWeek, totalWeeks, onWeekChange }: WeekNavigationProps) {
  const completedSets = 45
  const totalSets = 60
  const progressPercentage = (completedSets / totalSets) * 100

  return (
    <div className="space-y-4">
      {/* Week Progress Ring */}
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${progressPercentage * 2.51} 251`}
              className="text-primary"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold">{completedSets}</div>
              <div className="text-xs text-muted-foreground">/{totalSets}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onWeekChange(Math.max(1, currentWeek - 1))}
          disabled={currentWeek === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: Math.min(5, totalWeeks) }, (_, i) => {
            const weekNum = Math.max(1, Math.min(totalWeeks - 4, currentWeek - 2)) + i
            if (weekNum > totalWeeks) return null

            return (
              <Button
                key={weekNum}
                variant={weekNum === currentWeek ? "default" : "ghost"}
                size="sm"
                onClick={() => onWeekChange(weekNum)}
                className={weekNum === currentWeek ? "bg-primary" : ""}
              >
                W{weekNum}
              </Button>
            )
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onWeekChange(Math.min(totalWeeks, currentWeek + 1))}
          disabled={currentWeek === totalWeeks}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Week {currentWeek} of {totalWeeks} • {Math.round(progressPercentage)}% Complete
      </div>
    </div>
  )
}
