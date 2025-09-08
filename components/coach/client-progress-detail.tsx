"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressPhotoManager } from "./progress-photo-manager"
import { WeeklyReviewSystem } from "./weekly-review-system"
import { ArrowLeft, TrendingUp, TrendingDown, Target } from "lucide-react"
import Link from "next/link"

interface ClientProgressDetailProps {
  clientId: string
}

export function ClientProgressDetail({ clientId }: ClientProgressDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock client data - replace with actual API call
  const client = {
    id: clientId,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    startDate: "2024-01-15",
    currentWeight: 142.8,
    startWeight: 158.0,
    goalWeight: 135.0,
    bodyFat: 22.5,
    muscleMass: 98.2,
    measurements: {
      waist: 28.5,
      chest: 34.0,
      arms: 11.2,
      thighs: 21.8,
    },
    goals: [
      { name: "Lose 20 lbs", progress: 76, target: "March 2024" },
      { name: "Body Fat < 20%", progress: 45, target: "April 2024" },
      { name: "Gain Muscle", progress: 62, target: "May 2024" },
    ],
  }

  const progressData = [
    { date: "Week 1", weight: 158.0, bodyFat: 28.2 },
    { date: "Week 2", weight: 156.5, bodyFat: 27.8 },
    { date: "Week 3", weight: 154.2, bodyFat: 26.9 },
    { date: "Week 4", weight: 152.8, bodyFat: 25.8 },
    { date: "Week 5", weight: 150.1, bodyFat: 24.6 },
    { date: "Week 6", weight: 148.9, bodyFat: 23.8 },
    { date: "Week 7", weight: 146.2, bodyFat: 23.1 },
    { date: "Week 8", weight: 142.8, bodyFat: 22.5 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/coach/progress">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={client.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">Started {new Date(client.startDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Weight</p>
              <p className="text-2xl font-bold">{client.currentWeight} lbs</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-green-500">-{(client.startWeight - client.currentWeight).toFixed(1)} lbs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Body Fat %</p>
              <p className="text-2xl font-bold">{client.bodyFat}%</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-green-500">-5.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Muscle Mass</p>
              <p className="text-2xl font-bold">{client.muscleMass} lbs</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+2.1 lbs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Goal Progress</p>
              <p className="text-2xl font-bold">76%</p>
              <div className="flex items-center gap-1 text-sm">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-primary">On Track</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="photos">Progress Photos</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="reviews">Weekly Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Goals Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {client.goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{goal.name}</span>
                      <Badge variant="outline">{goal.target}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weight & Body Fat Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b">
                    <span className="text-sm font-medium">{data.date}</span>
                    <div className="flex gap-4">
                      <span className="text-sm">{data.weight} lbs</span>
                      <span className="text-sm text-muted-foreground">{data.bodyFat}% BF</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <ProgressPhotoManager clientId={clientId} />
        </TabsContent>

        <TabsContent value="measurements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Body Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Waist</p>
                  <p className="text-xl font-bold">{client.measurements.waist}"</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Chest</p>
                  <p className="text-xl font-bold">{client.measurements.chest}"</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Arms</p>
                  <p className="text-xl font-bold">{client.measurements.arms}"</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Thighs</p>
                  <p className="text-xl font-bold">{client.measurements.thighs}"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <WeeklyReviewSystem clientId={clientId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
