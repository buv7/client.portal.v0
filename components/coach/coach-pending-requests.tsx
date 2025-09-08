"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Check, X, MessageSquare } from "lucide-react"
import Image from "next/image"

interface PendingRequest {
  id: string
  name: string
  email: string
  avatar: string
  message: string
  requestDate: string
  goals: string[]
}

export function CoachPendingRequests() {
  const [requests, setRequests] = useState<PendingRequest[]>([
    {
      id: "1",
      name: "Alex Thompson",
      email: "alex.t@email.com",
      avatar: "/vagus-logo-white.png",
      message: "Looking for help with strength training and nutrition guidance. I'm a beginner but very motivated!",
      requestDate: "2 days ago",
      goals: ["Strength Training", "Weight Loss", "Nutrition"],
    },
    {
      id: "2",
      name: "Jessica Martinez",
      email: "jessica.m@email.com",
      avatar: "/vagus-logo-white.png",
      message: "Need coaching for marathon preparation. Have been running for 2 years.",
      requestDate: "1 day ago",
      goals: ["Endurance", "Marathon Prep"],
    },
  ])

  const handleApprove = (requestId: string) => {
    console.log("Approving request:", requestId)
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
    // Implement approval logic
  }

  const handleReject = (requestId: string) => {
    console.log("Rejecting request:", requestId)
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
    // Implement rejection logic
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Pending Requests</span>
            <Badge variant="secondary">{requests.length}</Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-8">
            <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No pending client requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={request.avatar || "/placeholder.svg"}
                      alt={request.name}
                      width={48}
                      height={48}
                      className="rounded-full bg-muted"
                    />
                    <div>
                      <h4 className="font-semibold">{request.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.email}</p>
                      <p className="text-xs text-muted-foreground">Requested {request.requestDate}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm mb-3">{request.message}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {request.goals.map((goal) => (
                    <Badge key={goal} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(request.id)}
                    className="bg-primary text-primary-foreground"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleReject(request.id)}>
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
