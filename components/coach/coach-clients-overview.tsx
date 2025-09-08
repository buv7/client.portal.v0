"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, FileText, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Client {
  id: string
  name: string
  email: string
  avatar: string
  status: "active" | "inactive" | "paused"
  lastActivity: string
  planType: string
}

export function CoachClientsOverview() {
  const clients: Client[] = [
    {
      id: "1",
      name: "Mike Johnson",
      email: "mike.j@email.com",
      avatar: "/vagus-logo-white.png",
      status: "active",
      lastActivity: "2 hours ago",
      planType: "Strength Training",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.c@email.com",
      avatar: "/vagus-logo-white.png",
      status: "active",
      lastActivity: "1 day ago",
      planType: "Weight Loss",
    },
    {
      id: "3",
      name: "David Rodriguez",
      email: "david.r@email.com",
      avatar: "/vagus-logo-white.png",
      status: "paused",
      lastActivity: "3 days ago",
      planType: "Muscle Gain",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary text-primary-foreground">Active</Badge>
      case "paused":
        return <Badge variant="secondary">Paused</Badge>
      default:
        return <Badge variant="outline">Inactive</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Connected Clients</span>
            <Badge variant="secondary">{clients.length}</Badge>
          </CardTitle>
          <Link href="/coach/clients">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Image
                  src={client.avatar || "/placeholder.svg"}
                  alt={client.name}
                  width={48}
                  height={48}
                  className="rounded-full bg-muted"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{client.name}</h4>
                    {getStatusBadge(client.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {client.planType} • Last active {client.lastActivity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Weekly Review
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="ghost">
                  <FileText className="h-4 w-4 mr-1" />
                  Notes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
