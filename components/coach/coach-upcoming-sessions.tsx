"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video, Users } from "lucide-react"
import Link from "next/link"

interface Session {
  id: string
  title: string
  client: string
  date: string
  time: string
  duration: string
  type: "in-person" | "virtual" | "group"
  location: string
  status: "confirmed" | "pending" | "cancelled"
}

export function CoachUpcomingSessions() {
  const sessions: Session[] = [
    {
      id: "1",
      title: "Strength Training Session",
      client: "Mike Johnson",
      date: "Today",
      time: "2:00 PM",
      duration: "60 min",
      type: "in-person",
      location: "VAGUS Gym - Studio A",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Nutrition Consultation",
      client: "Sarah Chen",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "45 min",
      type: "virtual",
      location: "Zoom Meeting",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Group HIIT Class",
      client: "Group Session",
      date: "Friday",
      time: "6:00 PM",
      duration: "45 min",
      type: "group",
      location: "VAGUS Gym - Main Floor",
      status: "pending",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "virtual":
        return <Video className="h-4 w-4" />
      case "group":
        return <Users className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-primary text-primary-foreground">Confirmed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="destructive">Cancelled</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "virtual":
        return "text-primary"
      case "group":
        return "text-accent"
      default:
        return "text-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Sessions</span>
            <Badge variant="secondary">{sessions.length}</Badge>
          </CardTitle>
          <Link href="/coach/calendar">
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 bg-muted/30 rounded-lg border-l-4 border-l-primary">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{session.title}</h4>
                  <p className="text-sm text-muted-foreground">with {session.client}</p>
                </div>
                {getStatusBadge(session.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {session.time} ({session.duration})
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <div className={getTypeColor(session.type)}>{getTypeIcon(session.type)}</div>
                <span className="text-sm">{session.location}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-primary text-primary-foreground">
                  {session.type === "virtual" ? "Join Meeting" : "Start Session"}
                </Button>
                <Button size="sm" variant="outline">
                  Reschedule
                </Button>
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
