"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Calendar, MessageSquare, Star } from "lucide-react"

export function CoachAnalyticsSummary() {
  const [timeRange, setTimeRange] = useState("7")

  const analytics = {
    "7": {
      activeClients: { value: 24, change: +3, trend: "up" },
      sessionsCompleted: { value: 18, change: +5, trend: "up" },
      responseTime: { value: "2.3h", change: -0.5, trend: "up" },
      clientSatisfaction: { value: 4.8, change: +0.2, trend: "up" },
      revenue: { value: "$3,240", change: +12, trend: "up" },
      planCompliance: { value: "87%", change: +5, trend: "up" },
    },
    "30": {
      activeClients: { value: 28, change: +8, trend: "up" },
      sessionsCompleted: { value: 76, change: +12, trend: "up" },
      responseTime: { value: "2.1h", change: -0.3, trend: "up" },
      clientSatisfaction: { value: 4.9, change: +0.1, trend: "up" },
      revenue: { value: "$12,960", change: +18, trend: "up" },
      planCompliance: { value: "89%", change: +3, trend: "up" },
    },
    "90": {
      activeClients: { value: 32, change: +15, trend: "up" },
      sessionsCompleted: { value: 234, change: +28, trend: "up" },
      responseTime: { value: "1.9h", change: -0.8, trend: "up" },
      clientSatisfaction: { value: 4.9, change: +0.3, trend: "up" },
      revenue: { value: "$38,880", change: +22, trend: "up" },
      planCompliance: { value: "91%", change: +7, trend: "up" },
    },
  }

  const currentData = analytics[timeRange as keyof typeof analytics]

  const MetricCard = ({
    title,
    value,
    change,
    trend,
    icon: Icon,
  }: {
    title: string
    value: string | number
    change: number
    trend: "up" | "down"
    icon: any
  }) => (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        {trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-primary" />
        ) : (
          <TrendingDown className="h-4 w-4 text-destructive" />
        )}
        <span className={`text-sm font-medium ${trend === "up" ? "text-primary" : "text-destructive"}`}>
          {change > 0 ? "+" : ""}
          {change}
          {typeof change === "number" && change % 1 !== 0 ? "" : "%"}
        </span>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>Performance Analytics</span>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Pro Insights
            </Badge>
          </CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Active Clients"
            value={currentData.activeClients.value}
            change={currentData.activeClients.change}
            trend={currentData.activeClients.trend}
            icon={Users}
          />
          <MetricCard
            title="Sessions Completed"
            value={currentData.sessionsCompleted.value}
            change={currentData.sessionsCompleted.change}
            trend={currentData.sessionsCompleted.trend}
            icon={Calendar}
          />
          <MetricCard
            title="Avg Response Time"
            value={currentData.responseTime.value}
            change={currentData.responseTime.change}
            trend={currentData.responseTime.trend}
            icon={MessageSquare}
          />
          <MetricCard
            title="Client Satisfaction"
            value={currentData.clientSatisfaction.value}
            change={currentData.clientSatisfaction.change}
            trend={currentData.clientSatisfaction.trend}
            icon={Star}
          />
          <MetricCard
            title="Revenue"
            value={currentData.revenue.value}
            change={currentData.revenue.change}
            trend={currentData.revenue.trend}
            icon={TrendingUp}
          />
          <MetricCard
            title="Plan Compliance"
            value={currentData.planCompliance.value}
            change={currentData.planCompliance.change}
            trend={currentData.planCompliance.trend}
            icon={TrendingUp}
          />
        </div>
      </CardContent>
    </Card>
  )
}
