"use client"

import { useState } from "react"
import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, Plus, MessageSquare, Calendar, FileText, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

interface Client {
  id: string
  name: string
  email: string
  avatar: string
  status: "active" | "inactive" | "paused"
  planType: string
  joinDate: string
  lastActivity: string
  progress: {
    workoutsCompleted: number
    totalWorkouts: number
    compliance: number
  }
  goals: string[]
  nextSession?: string
}

export default function CoachClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const clients: Client[] = [
    {
      id: "1",
      name: "Mike Johnson",
      email: "mike.j@email.com",
      avatar: "/vagus-logo-white.png",
      status: "active",
      planType: "Strength Training",
      joinDate: "2024-01-15",
      lastActivity: "2 hours ago",
      progress: {
        workoutsCompleted: 24,
        totalWorkouts: 28,
        compliance: 86,
      },
      goals: ["Muscle Gain", "Strength"],
      nextSession: "Today 2:00 PM",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.c@email.com",
      avatar: "/vagus-logo-white.png",
      status: "active",
      planType: "Weight Loss",
      joinDate: "2024-02-01",
      lastActivity: "1 day ago",
      progress: {
        workoutsCompleted: 18,
        totalWorkouts: 20,
        compliance: 90,
      },
      goals: ["Weight Loss", "Cardio"],
      nextSession: "Tomorrow 10:00 AM",
    },
    {
      id: "3",
      name: "David Rodriguez",
      email: "david.r@email.com",
      avatar: "/vagus-logo-white.png",
      status: "paused",
      planType: "Muscle Gain",
      joinDate: "2023-12-10",
      lastActivity: "3 days ago",
      progress: {
        workoutsCompleted: 45,
        totalWorkouts: 52,
        compliance: 87,
      },
      goals: ["Muscle Gain", "Nutrition"],
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      avatar: "/vagus-logo-white.png",
      status: "active",
      planType: "General Fitness",
      joinDate: "2024-03-01",
      lastActivity: "5 hours ago",
      progress: {
        workoutsCompleted: 12,
        totalWorkouts: 16,
        compliance: 75,
      },
      goals: ["General Fitness", "Health"],
      nextSession: "Friday 6:00 PM",
    },
  ]

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

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

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return "text-primary"
    if (compliance >= 60) return "text-accent"
    return "text-destructive"
  }

  return (
    <CoachDashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Client Management</h1>
            <p className="text-muted-foreground">Manage and track your client progress</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="joinDate">Join Date</SelectItem>
                  <SelectItem value="lastActivity">Last Activity</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold">{clients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                  <p className="text-2xl font-bold">{clients.filter((c) => c.status === "active").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Sessions Today</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Compliance</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Clients ({filteredClients.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={client.avatar || "/placeholder.svg"}
                        alt={client.name}
                        width={60}
                        height={60}
                        className="rounded-full bg-muted"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{client.name}</h3>
                          {getStatusBadge(client.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {client.planType} • Joined {new Date(client.joinDate).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {client.goals.map((goal) => (
                            <Badge key={goal} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Progress Stats */}
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Progress:</span>
                          <span className="text-sm font-medium">
                            {client.progress.workoutsCompleted}/{client.progress.totalWorkouts}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Compliance:</span>
                          <span className={`text-sm font-medium ${getComplianceColor(client.progress.compliance)}`}>
                            {client.progress.compliance}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last active: {client.lastActivity}</p>
                        {client.nextSession && (
                          <p className="text-xs text-primary font-medium">Next: {client.nextSession}</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Link href={`/coach/clients/${client.id}`}>
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </Link>
                        <Link href={`/coach/clients/${client.id}/weekly-review`}>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </Link>
                        <Link href={`/coach/messages/${client.id}`}>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              View Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Session
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="h-4 w-4 mr-2" />
                              Create Plan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CoachDashboardLayout>
  )
}
