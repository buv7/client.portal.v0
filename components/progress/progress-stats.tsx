"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { ProgressEntry } from "./progress-tracker"

interface ProgressStatsProps {
  data: ProgressEntry[]
}

export function ProgressStats({ data }: ProgressStatsProps) {
  const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime())

  const weightData = sortedData
    .filter((entry) => entry.weight)
    .map((entry) => ({
      date: entry.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weight: entry.weight,
    }))

  const waistData = sortedData
    .filter((entry) => entry.measurements.waist)
    .map((entry) => ({
      date: entry.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      waist: entry.measurements.waist,
    }))

  const getTrend = (values: number[]) => {
    if (values.length < 2) return "stable"
    const first = values[0]
    const last = values[values.length - 1]
    const change = ((last - first) / first) * 100
    if (Math.abs(change) < 1) return "stable"
    return change > 0 ? "up" : "down"
  }

  const weightValues = weightData.map((d) => d.weight!).filter(Boolean)
  const waistValues = waistData.map((d) => d.waist!).filter(Boolean)

  const weightTrend = getTrend(weightValues)
  const waistTrend = getTrend(waistValues)

  const currentWeight = weightValues[weightValues.length - 1]
  const startWeight = weightValues[0]
  const weightChange = currentWeight && startWeight ? currentWeight - startWeight : 0

  const currentWaist = waistValues[waistValues.length - 1]
  const startWaist = waistValues[0]
  const waistChange = currentWaist && startWaist ? currentWaist - startWaist : 0

  const TrendIcon = ({ trend }: { trend: string }) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <TrendIcon trend={weightTrend} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeight || "N/A"} lbs</div>
            <p className="text-xs text-muted-foreground">
              {weightChange !== 0 && (
                <span className={weightChange < 0 ? "text-green-600" : "text-red-600"}>
                  {weightChange > 0 ? "+" : ""}
                  {weightChange.toFixed(1)} lbs from start
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waist Size</CardTitle>
            <TrendIcon trend={waistTrend} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWaist || "N/A"}"</div>
            <p className="text-xs text-muted-foreground">
              {waistChange !== 0 && (
                <span className={waistChange < 0 ? "text-green-600" : "text-red-600"}>
                  {waistChange > 0 ? "+" : ""}
                  {waistChange.toFixed(1)}" from start
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">Progress entries recorded</p>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      {weightData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Measurements Chart */}
      {waistData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Waist Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waistData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="waist"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
