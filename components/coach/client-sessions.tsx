"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video, Users, Plus } from "lucide-react"

interface ClientSessionsProps {
  clientId: string
}

interface Session {
  id: string
  title: string
  date: string
  time: string
  duration: string
  type: "in-person" | "virtual" | "group"
  location: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

export function ClientSessions({ clientId }: ClientSessionsProps) {
  const sessions: Session[] = [
    {
      id: "1",
      title: "Strength Training Session",
      date: "2024-03-20",
      time: "2:00 PM",
      duration: "60 min",
      type: "in-person",
      location: "VAGUS Gym - Studio A",
      status: "scheduled",
    },
    {
      id: "2",
      title: "Progress Check-in",
      date: "2024-03-18",
      time: "10:00 AM",
      duration: "30 min",
      type: "virtual",
      location: "Zoom Meeting",
      status: "completed",
      notes: "Great progress on bench press. Discussed nutrition adjustments.",
    },
    {
      id: "3",
      title: "Form Assessment",
      date: "2024-03-15",
      time: "3:00 PM",
      duration: "45 min",
      type: "in-person",
      location: "VAGUS Gym - Studio B",
      status: "completed",
      notes: "Worked on squat depth and deadlift setup. Client showing improvement.",
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
      case "scheduled":
        return <Badge className="bg-primary text-primary-foreground">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-accent text-accent-foreground">Completed</Badge>
      default:
        return <Badge variant="destructive">Cancelled</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Training Sessions</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{session.title}</h4>
                    {getStatusBadge(session.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {session.time} ({session.duration})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(session.type)}
                      <span>{session.location}</span>
                    </div>
                  </div>

                  {session.notes && (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm">{session.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {session.status === "scheduled" && (
                    <>
                      <Button size="sm">{session.type === "virtual" ? "Join Meeting" : "Start Session"}</Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </>
                  )}
                  {session.status === "completed" && (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
