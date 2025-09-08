"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Utensils, Calendar, Eye, Edit, Copy, Trash2 } from "lucide-react"
import Link from "next/link"

interface ClientPlansProps {
  clientId: string
}

interface Plan {
  id: string
  name: string
  type: "workout" | "nutrition"
  status: "active" | "completed" | "draft"
  startDate: string
  endDate: string
  progress: number
  description: string
}

export function ClientPlans({ clientId }: ClientPlansProps) {
  const plans: Plan[] = [
    {
      id: "1",
      name: "Strength Building Phase 1",
      type: "workout",
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-03-28",
      progress: 75,
      description: "4-week strength building program focusing on compound movements",
    },
    {
      id: "2",
      name: "Muscle Gain Nutrition",
      type: "nutrition",
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      progress: 68,
      description: "High protein nutrition plan for muscle gain with meal timing",
    },
    {
      id: "3",
      name: "Conditioning Phase",
      type: "workout",
      status: "completed",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      progress: 100,
      description: "Cardiovascular conditioning and endurance building",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary text-primary-foreground">Active</Badge>
      case "completed":
        return <Badge className="bg-accent text-accent-foreground">Completed</Badge>
      default:
        return <Badge variant="outline">Draft</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "workout" ? <Dumbbell className="h-4 w-4" /> : <Utensils className="h-4 w-4" />
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-primary"
    if (progress >= 60) return "bg-accent"
    return "bg-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Client Plans</h3>
        <div className="flex space-x-2">
          <Link href={`/coach/plans/workout/new?client=${clientId}`}>
            <Button size="sm">
              <Dumbbell className="h-4 w-4 mr-1" />
              New Workout Plan
            </Button>
          </Link>
          <Link href={`/coach/plans/nutrition/new?client=${clientId}`}>
            <Button size="sm" variant="outline">
              <Utensils className="h-4 w-4 mr-1" />
              New Nutrition Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-muted rounded-lg">{getTypeIcon(plan.type)}</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{plan.name}</h4>
                      {getStatusBadge(plan.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(plan.startDate).toLocaleDateString()} -{" "}
                          {new Date(plan.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Progress:</span>
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(plan.progress)} transition-all`}
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                        <span className="font-medium">{plan.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
