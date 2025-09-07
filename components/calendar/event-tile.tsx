"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { EventDetailSheet } from "./event-detail-sheet"
import type { CalendarEvent } from "./mock-events"

interface EventTileProps {
  event: CalendarEvent
  compact?: boolean
}

export function EventTile({ event, compact = false }: EventTileProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workout":
        return "bg-primary text-primary-foreground"
      case "nutrition":
        return "bg-accent text-accent-foreground"
      case "session":
        return "bg-chart-1 text-chart-1-foreground"
      case "supplement":
        return "bg-chart-3 text-chart-3-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        className={`w-full p-2 h-auto justify-start hover:bg-transparent ${compact ? "text-xs" : "text-sm"}`}
        onClick={(e) => {
          e.stopPropagation()
          setShowDetails(true)
        }}
      >
        <div className="w-full space-y-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getCategoryColor(event.category)}`} />
            <span className="font-medium truncate">{event.title}</span>
            {event.capacity && (
              <Badge variant="outline" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {event.capacity.current}/{event.capacity.max}
              </Badge>
            )}
          </div>
          {!compact && (
            <div className="text-xs text-muted-foreground">
              {event.time} {event.location && `• ${event.location}`}
            </div>
          )}
        </div>
      </Button>

      <EventDetailSheet event={event} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}
