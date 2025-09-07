"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { MonthView } from "./month-view"
import { WeekView } from "./week-view"
import { DayView } from "./day-view"
import { EventEditor } from "./event-editor"

type ViewType = "month" | "week" | "day"

export function CalendarViewer() {
  const [currentView, setCurrentView] = useState<ViewType>("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showEventEditor, setShowEventEditor] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const formatDateHeader = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    }

    if (currentView === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    }

    if (currentView === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }

    return currentDate.toLocaleDateString("en-US", options)
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    if (currentView === "month") {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    } else if (currentView === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    }

    setCurrentDate(newDate)
  }

  const handleAddEvent = (date?: Date) => {
    setSelectedDate(date || currentDate)
    setShowEventEditor(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-medium min-w-[200px] text-center">{formatDateHeader()}</h2>
            <Button variant="ghost" size="sm" onClick={() => navigateDate("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button onClick={() => handleAddEvent()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* View Switcher */}
      <div className="flex items-center gap-2">
        {(["month", "week", "day"] as ViewType[]).map((view) => (
          <Button
            key={view}
            variant={currentView === view ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentView(view)}
            className={currentView === view ? "bg-primary" : ""}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
        ))}
      </div>

      {/* Calendar Views */}
      {currentView === "month" && <MonthView currentDate={currentDate} onAddEvent={handleAddEvent} />}
      {currentView === "week" && <WeekView currentDate={currentDate} onAddEvent={handleAddEvent} />}
      {currentView === "day" && <DayView currentDate={currentDate} onAddEvent={handleAddEvent} />}

      {/* Event Editor */}
      <EventEditor
        open={showEventEditor}
        onOpenChange={setShowEventEditor}
        selectedDate={selectedDate}
        onSave={() => setShowEventEditor(false)}
      />
    </div>
  )
}
