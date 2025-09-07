"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EventTile } from "./event-tile"
import { mockEvents } from "./mock-events"

interface WeekViewProps {
  currentDate: Date
  onAddEvent: (date: Date, time?: string) => void
}

export function WeekView({ currentDate, onAddEvent }: WeekViewProps) {
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = getWeekDays()
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)

  const getEventsForDateTime = (date: Date, time: string) => {
    return mockEvents.filter((event) => {
      const eventDate = new Date(event.date)
      const eventTime = event.time.split(":")[0].padStart(2, "0") + ":00"
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        eventTime === time
      )
    })
  }

  return (
    <Card className="p-6">
      <div className="grid grid-cols-8 gap-2">
        {/* Time Column */}
        <div className="space-y-2">
          <div className="h-12" /> {/* Header spacer */}
          {timeSlots.map((time) => (
            <div key={time} className="h-16 text-xs text-muted-foreground text-right pr-2 flex items-start pt-1">
              {time}
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {weekDays.map((day) => {
          const isToday =
            day.getDate() === new Date().getDate() &&
            day.getMonth() === new Date().getMonth() &&
            day.getFullYear() === new Date().getFullYear()

          return (
            <div key={day.toISOString()} className="space-y-2">
              {/* Day Header */}
              <div className={`h-12 text-center p-2 rounded ${isToday ? "bg-primary text-primary-foreground" : ""}`}>
                <div className="text-xs font-medium">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className="text-sm">{day.getDate()}</div>
              </div>

              {/* Time Slots */}
              {timeSlots.map((time) => {
                const events = getEventsForDateTime(day, time)
                return (
                  <Button
                    key={time}
                    variant="ghost"
                    className="h-16 w-full p-1 justify-start items-start hover:bg-muted/50"
                    onClick={() => onAddEvent(day, time)}
                  >
                    <div className="w-full space-y-1">
                      {events.map((event) => (
                        <EventTile key={event.id} event={event} compact />
                      ))}
                    </div>
                  </Button>
                )
              })}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
