"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Users, Edit, Trash2, Check, Store as Snooze, X } from "lucide-react"
import { SupplementQuickActions } from "./supplement-quick-actions"
import type { CalendarEvent } from "./mock-events"

interface EventDetailSheetProps {
  event: CalendarEvent
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDetailSheet({ event, open, onOpenChange }: EventDetailSheetProps) {
  const [showSupplementActions, setShowSupplementActions] = useState(false)

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
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-left flex items-center gap-2">
              {event.title}
              <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Event Details */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {event.time}
                  </span>
                </div>

                {event.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.capacity && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {event.capacity.current}/{event.capacity.max} participants
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {event.description && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Supplement Quick Actions */}
            {event.category === "supplement" && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Check className="w-4 h-4 mr-2" />
                      Mark Taken
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={() => setShowSupplementActions(true)}
                    >
                      <Snooze className="w-4 h-4 mr-2" />
                      Snooze
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent text-destructive">
                      <X className="w-4 h-4 mr-2" />
                      Skip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <SupplementQuickActions
        open={showSupplementActions}
        onOpenChange={setShowSupplementActions}
        onAction={(action) => {
          console.log(`Supplement ${action}`)
          setShowSupplementActions(false)
        }}
      />
    </>
  )
}
