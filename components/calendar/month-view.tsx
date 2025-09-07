"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EventTile } from "./event-tile"
import { mockEvents } from "./mock-events"

interface MonthViewProps {
  currentDate: Date
  onAddEvent: (date: Date) => void
}

export function MonthView({ currentDate, onAddEvent }: MonthViewProps) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const days = getDaysInMonth()
  const currentMonth = currentDate.getMonth()

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  return (
    <Card className="p-6">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentMonth
          const isToday =
            day.getDate() === new Date().getDate() &&
            day.getMonth() === new Date().getMonth() &&
            day.getFullYear() === new Date().getFullYear()
          const dayEvents = getEventsForDate(day)

          return (
            <Button
              key={index}
              variant="ghost"
              className={`h-24 p-2 flex flex-col items-start justify-start hover:bg-muted/50 ${
                !isCurrentMonth ? "text-muted-foreground/50" : ""
              } ${isToday ? "bg-primary/10 border border-primary/20" : ""}`}
              onClick={() => onAddEvent(day)}
            >
              <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day.getDate()}</span>

              <div className="w-full space-y-1 mt-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <EventTile key={event.id} event={event} compact />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
