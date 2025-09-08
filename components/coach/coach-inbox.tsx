"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Clock, MessageSquare, Phone, CheckCircle, Archive } from "lucide-react"
import Image from "next/image"

interface ClientFlag {
  id: string
  clientName: string
  clientAvatar: string
  type: "urgent" | "warning" | "info"
  message: string
  timestamp: string
  priority: "high" | "medium" | "low"
}

export function CoachInbox() {
  const [bulkMode, setBulkMode] = useState(false)
  const [selectedFlags, setSelectedFlags] = useState<string[]>([])

  const clientFlags: ClientFlag[] = [
    {
      id: "1",
      clientName: "Mike Johnson",
      clientAvatar: "/vagus-logo-white.png",
      type: "urgent",
      message: "Missed 3 consecutive workouts - needs immediate attention",
      timestamp: "2 hours ago",
      priority: "high",
    },
    {
      id: "2",
      clientName: "Sarah Chen",
      clientAvatar: "/vagus-logo-white.png",
      type: "warning",
      message: "Weight plateau for 2 weeks - consider plan adjustment",
      timestamp: "5 hours ago",
      priority: "medium",
    },
    {
      id: "3",
      clientName: "David Rodriguez",
      clientAvatar: "/vagus-logo-white.png",
      type: "info",
      message: "Requested nutrition plan modification",
      timestamp: "1 day ago",
      priority: "medium",
    },
    {
      id: "4",
      clientName: "Emma Wilson",
      clientAvatar: "/vagus-logo-white.png",
      type: "urgent",
      message: "Reported injury during last workout",
      timestamp: "3 hours ago",
      priority: "high",
    },
  ]

  const handleFlagSelect = (flagId: string) => {
    setSelectedFlags((prev) => (prev.includes(flagId) ? prev.filter((id) => id !== flagId) : [...prev, flagId]))
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on flags:`, selectedFlags)
    // Implement bulk actions
    setSelectedFlags([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "warning":
        return <Clock className="h-4 w-4 text-accent" />
      default:
        return <MessageSquare className="h-4 w-4 text-primary" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "warning":
        return <Badge className="bg-accent text-accent-foreground">Warning</Badge>
      default:
        return <Badge variant="secondary">Info</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span>Coach Inbox</span>
            <Badge variant="destructive">{clientFlags.length}</Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setBulkMode(!bulkMode)}>
              {bulkMode ? "Cancel" : "Bulk Select"}
            </Button>
            {bulkMode && selectedFlags.length > 0 && (
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleBulkAction("nudge")}>
                  Nudge
                </Button>
                <Button size="sm" onClick={() => handleBulkAction("call")}>
                  Quick Call
                </Button>
                <Button size="sm" onClick={() => handleBulkAction("reviewed")}>
                  Mark Reviewed
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clientFlags.map((flag) => (
            <div
              key={flag.id}
              className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg border-l-4 border-l-destructive"
            >
              {bulkMode && (
                <Checkbox checked={selectedFlags.includes(flag.id)} onCheckedChange={() => handleFlagSelect(flag.id)} />
              )}
              <Image
                src={flag.clientAvatar || "/placeholder.svg"}
                alt={flag.clientName}
                width={40}
                height={40}
                className="rounded-full bg-muted"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{flag.clientName}</h4>
                    {getTypeBadge(flag.type)}
                  </div>
                  <span className="text-sm text-muted-foreground">{flag.timestamp}</span>
                </div>
                <p className="text-sm">{flag.message}</p>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Quick Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Reviewed
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
