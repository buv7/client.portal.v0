"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, TrendingDown, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CheckIn {
  id: string
  clientName: string
  clientAvatar: string
  date: string
  weight: number
  weightChange: number
  notes: string
  mood: number
  energy: number
}

export function CoachRecentCheckins() {
  const checkIns: CheckIn[] = [
    {
      id: "1",
      clientName: "Mike Johnson",
      clientAvatar: "/vagus-logo-white.png",
      date: "Today",
      weight: 185.2,
      weightChange: -1.3,
      notes: "Feeling great! Workouts are getting easier and I'm seeing muscle definition.",
      mood: 9,
      energy: 8,
    },
    {
      id: "2",
      clientName: "Sarah Chen",
      clientAvatar: "/vagus-logo-white.png",
      date: "Yesterday",
      weight: 142.8,
      weightChange: -0.5,
      notes: "Had a tough week with work stress, but managed to stick to the meal plan.",
      mood: 7,
      energy: 6,
    },
    {
      id: "3",
      clientName: "David Rodriguez",
      clientAvatar: "/vagus-logo-white.png",
      date: "2 days ago",
      weight: 198.5,
      weightChange: +0.8,
      notes: "Struggled with portion control over the weekend. Need better strategies.",
      mood: 6,
      energy: 7,
    },
  ]

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return "text-primary"
    if (mood >= 6) return "text-accent"
    return "text-destructive"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Recent Check-ins</span>
            <Badge variant="secondary">{checkIns.length}</Badge>
          </CardTitle>
          <Link href="/coach/checkins">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checkIns.map((checkIn) => (
            <div key={checkIn.id} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src={checkIn.clientAvatar || "/placeholder.svg"}
                    alt={checkIn.clientName}
                    width={40}
                    height={40}
                    className="rounded-full bg-muted"
                  />
                  <div>
                    <h4 className="font-semibold">{checkIn.clientName}</h4>
                    <p className="text-sm text-muted-foreground">{checkIn.date}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <div className="flex items-center justify-center space-x-1">
                    <span className="font-semibold">{checkIn.weight} lbs</span>
                    {checkIn.weightChange !== 0 && (
                      <div className="flex items-center">
                        {checkIn.weightChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-destructive" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-primary" />
                        )}
                        <span className={`text-xs ${checkIn.weightChange > 0 ? "text-destructive" : "text-primary"}`}>
                          {Math.abs(checkIn.weightChange)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Mood</p>
                  <p className={`font-semibold ${getMoodColor(checkIn.mood)}`}>{checkIn.mood}/10</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Energy</p>
                  <p className={`font-semibold ${getMoodColor(checkIn.energy)}`}>{checkIn.energy}/10</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{checkIn.notes}</p>

              <div className="flex justify-end mt-3">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
