"use client"
import { useParams } from "next/navigation"
import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Calendar, TrendingUp, Target, Activity, Phone, Mail, MapPin, Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ClientProgressCharts } from "@/components/coach/client-progress-charts"
import { ClientNotes } from "@/components/coach/client-notes"
import { ClientPlans } from "@/components/coach/client-plans"
import { ClientSessions } from "@/components/coach/client-sessions"

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id as string

  // Mock client data - in real app, fetch based on clientId
  const client = {
    id: clientId,
    name: "Mike Johnson",
    email: "mike.j@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/vagus-logo-white.png",
    status: "active",
    planType: "Strength Training",
    joinDate: "2024-01-15",
    lastActivity: "2 hours ago",
    location: "New York, NY",
    age: 28,
    height: "6'0\"",
    currentWeight: 185.2,
    goalWeight: 195,
    goals: ["Muscle Gain", "Strength", "Athletic Performance"],
    progress: {
      workoutsCompleted: 24,
      totalWorkouts: 28,
      compliance: 86,
      weightChange: +8.5,
      strengthGains: 15,
    },
    stats: {
      totalSessions: 32,
      streak: 12,
      avgRating: 4.8,
    },
    nextSession: "Today 2:00 PM",
    emergencyContact: {
      name: "Jane Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 123-4568",
    },
  }

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
    <CoachDashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={client.avatar || "/placeholder.svg"}
              alt={client.name}
              width={80}
              height={80}
              className="rounded-full bg-muted"
            />
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold">{client.name}</h1>
                {getStatusBadge(client.status)}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{client.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/coach/messages/${client.id}`}>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </Link>
            <Link href={`/coach/clients/${client.id}/weekly-review`}>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Weekly Review
              </Button>
            </Link>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p className="text-xl font-bold text-primary">{client.progress.compliance}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Weight Change</p>
                  <p className="text-xl font-bold text-accent">+{client.progress.weightChange} lbs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                  <p className="text-xl font-bold">
                    {client.progress.workoutsCompleted}/{client.progress.totalWorkouts}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-xl font-bold">{client.stats.streak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-semibold">{client.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-semibold">{client.height}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Weight</p>
                      <p className="font-semibold">{client.currentWeight} lbs</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Goal Weight</p>
                      <p className="font-semibold">{client.goalWeight} lbs</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Goals</p>
                    <div className="flex flex-wrap gap-2">
                      {client.goals.map((goal) => (
                        <Badge key={goal} variant="outline">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plan Type</p>
                    <p className="font-semibold">{client.planType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-semibold">{new Date(client.joinDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{client.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Relationship</p>
                    <p className="font-semibold">{client.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">{client.emergencyContact.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <ClientProgressCharts clientId={clientId} />
          </TabsContent>

          <TabsContent value="plans">
            <ClientPlans clientId={clientId} />
          </TabsContent>

          <TabsContent value="sessions">
            <ClientSessions clientId={clientId} />
          </TabsContent>

          <TabsContent value="notes">
            <ClientNotes clientId={clientId} />
          </TabsContent>
        </Tabs>
      </div>
    </CoachDashboardLayout>
  )
}
