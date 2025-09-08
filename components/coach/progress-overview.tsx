"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target } from "lucide-react"
import Link from "next/link"

export function ProgressOverview() {
  const [timeFilter, setTimeFilter] = useState("week")

  const clientProgress = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      goalProgress: 78,
      weightChange: -5.2,
      lastUpdate: "2 hours ago",
      status: "on-track",
      achievements: ["Weight Loss Goal", "Consistency Streak"],
      nextMilestone: "10lb weight loss",
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      goalProgress: 92,
      weightChange: 3.1,
      lastUpdate: "1 day ago",
      status: "exceeding",
      achievements: ["Strength Goal", "Body Fat %"],
      nextMilestone: "Muscle gain target",
    },
    {
      id: "3",
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      goalProgress: 45,
      weightChange: -1.8,
      lastUpdate: "3 days ago",
      status: "needs-attention",
      achievements: ["First Month"],
      nextMilestone: "5lb weight loss",
    },
  ]

  const overallStats = {
    totalClients: 24,
    onTrack: 18,
    needsAttention: 4,
    exceeding: 2,
    avgProgress: 73,
    weeklyCheckins: 89,
  }

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold">{overallStats.totalClients}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="text-2xl font-bold text-green-500">{overallStats.onTrack}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold text-yellow-500">{overallStats.needsAttention}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">{overallStats.avgProgress}%</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{overallStats.avgProgress}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Time Period:</span>
        {["week", "month", "quarter"].map((period) => (
          <Button
            key={period}
            variant={timeFilter === period ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFilter(period)}
            className="capitalize"
          >
            {period}
          </Button>
        ))}
      </div>

      {/* Client Progress List */}
      <Card>
        <CardHeader>
          <CardTitle>Client Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientProgress.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={client.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{client.name}</h3>
                      <Badge
                        variant={
                          client.status === "on-track"
                            ? "default"
                            : client.status === "exceeding"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {client.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Last update: {client.lastUpdate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Goal Progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={client.goalProgress} className="w-20" />
                      <span className="text-sm font-medium">{client.goalProgress}%</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Weight Change</p>
                    <div className="flex items-center gap-1">
                      {client.weightChange > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm font-medium">
                        {client.weightChange > 0 ? "+" : ""}
                        {client.weightChange} lbs
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/coach/progress/${client.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
