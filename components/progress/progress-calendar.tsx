"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Camera, Scale } from "lucide-react"
import type { ProgressEntry } from "./progress-tracker"

interface ProgressCalendarProps {
  data: ProgressEntry[]
}

export function ProgressCalendar({ data }: ProgressCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEntry, setSelectedEntry] = useState<ProgressEntry | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getEntriesForDate = (day: number) => {
    const date = new Date(year, month, day)
    return data.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate.toDateString() === date.toDateString()
    })
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{formatMonthYear(currentDate)}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-4">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekdays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="aspect-square" />
              }

              const entries = getEntriesForDate(day)
              const hasEntries = entries.length > 0
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

              return (
                <div
                  key={day}
                  className={`aspect-square border rounded-lg p-2 cursor-pointer transition-colors hover:bg-accent ${
                    isToday ? "bg-primary/10 border-primary" : "border-border"
                  } ${hasEntries ? "bg-accent/50" : ""}`}
                  onClick={() => entries.length > 0 && setSelectedEntry(entries[0])}
                >
                  <div className="flex flex-col h-full">
                    <span className={`text-sm ${isToday ? "font-bold text-primary" : ""}`}>{day}</span>

                    {hasEntries && (
                      <div className="flex-1 flex flex-col justify-end gap-1">
                        {entries.map((entry) => (
                          <div key={entry.id} className="flex gap-1">
                            {entry.weight && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" title="Weight recorded" />
                            )}
                            {(entry.photos.front || entry.photos.side || entry.photos.back) && (
                              <div className="w-2 h-2 bg-green-500 rounded-full" title="Photos taken" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Legend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm">Weight recorded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm">Progress photos taken</span>
          </div>
        </CardContent>
      </Card>

      {/* Selected Entry Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{formatDate(selectedEntry.date)}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setSelectedEntry(null)}>
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedEntry.weight && (
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{selectedEntry.weight} lbs</p>
                    <p className="text-sm text-muted-foreground">Weight</p>
                  </div>
                </div>
              )}

              {(selectedEntry.photos.front || selectedEntry.photos.side || selectedEntry.photos.back) && (
                <div className="flex items-center gap-3">
                  <Camera className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Progress Photos</p>
                    <div className="flex gap-1 mt-1">
                      {selectedEntry.photos.front && <Badge variant="secondary">Front</Badge>}
                      {selectedEntry.photos.side && <Badge variant="secondary">Side</Badge>}
                      {selectedEntry.photos.back && <Badge variant="secondary">Back</Badge>}
                    </div>
                  </div>
                </div>
              )}

              {Object.values(selectedEntry.measurements).some(Boolean) && (
                <div>
                  <p className="font-medium mb-2">Measurements</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {selectedEntry.measurements.waist && <div>Waist: {selectedEntry.measurements.waist}"</div>}
                    {selectedEntry.measurements.chest && <div>Chest: {selectedEntry.measurements.chest}"</div>}
                    {selectedEntry.measurements.arms && <div>Arms: {selectedEntry.measurements.arms}"</div>}
                    {selectedEntry.measurements.thighs && <div>Thighs: {selectedEntry.measurements.thighs}"</div>}
                  </div>
                </div>
              )}

              {selectedEntry.notes && (
                <div>
                  <p className="font-medium mb-2">Notes</p>
                  <p className="text-sm text-muted-foreground">{selectedEntry.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
