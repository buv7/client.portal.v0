"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EventTile } from "./event-tile"
import { mockEvents } from "./mock-events"

interface DayViewProps {
  currentDate: Date
  onAddEvent: (date: Date, time?: string) => void
}

export function DayView({ currentDate, onAddEvent }: DayViewProps) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)

  const getEventsForTime = (time: string) => {
    return mockEvents.filter((event) => {
      const eventDate = new Date(event.date)
      const eventTime = event.time.split(":")[0].padStart(2, "0") + ":00"
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventTime === time
      )
    })
  }

  return (
    <Card className="p-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Time Column */}
        <div className="col-span-2 space-y-2">
          {timeSlots.map((time) => (
            <div key={time} className="h-20 text-sm text-muted-foreground text-right pr-4 flex items-start pt-2">
              {time}
            </div>
          ))}
        </div>

        {/* Events Column */}
        <div className="col-span-10 space-y-2">
          {timeSlots.map((time) => {
            const events = getEventsForTime(time)
            return (
              <Button
                key={time}
                variant="ghost"
                className="h-20 w-full p-3 justify-start items-start hover:bg-muted/50 border-l-2 border-muted"
                onClick={() => onAddEvent(currentDate, time)}
              >
                <div className="w-full space-y-2">
                  {events.map((event) => (
                    <EventTile key={event.id} event={event} />
                  ))}
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
