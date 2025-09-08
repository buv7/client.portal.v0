"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dumbbell,
  Utensils,
  FileText,
  MessageSquare,
  Calendar,
  Plus,
  ClipboardList,
  BarChart3,
  Settings,
} from "lucide-react"
import Link from "next/link"

export function CoachQuickActions() {
  const quickActions = [
    {
      title: "New Workout Plan",
      description: "Create a custom workout plan",
      icon: Dumbbell,
      href: "/coach/plans/workout/new",
      color: "text-primary",
    },
    {
      title: "New Nutrition Plan",
      description: "Build a nutrition plan",
      icon: Utensils,
      href: "/coach/plans/nutrition/new",
      color: "text-accent",
    },
    {
      title: "Add Coach Note",
      description: "Quick note for a client",
      icon: FileText,
      href: "/coach/notes/new",
      color: "text-foreground",
    },
    {
      title: "Intake Forms",
      description: "Manage client intake forms",
      icon: ClipboardList,
      href: "/coach/forms",
      color: "text-primary",
    },
    {
      title: "Open Messages",
      description: "View client conversations",
      icon: MessageSquare,
      href: "/coach/messages",
      color: "text-accent",
    },
    {
      title: "Publish Availability",
      description: "Set your available time slots",
      icon: Calendar,
      href: "/coach/availability",
      color: "text-foreground",
    },
    {
      title: "Add Supplement",
      description: "Add supplement to client plan",
      icon: Plus,
      href: "/coach/supplements/new",
      color: "text-primary",
    },
    {
      title: "View Analytics",
      description: "Detailed performance metrics",
      icon: BarChart3,
      href: "/coach/analytics",
      color: "text-accent",
    },
    {
      title: "Templates",
      description: "Manage plan templates",
      icon: Settings,
      href: "/coach/templates",
      color: "text-foreground",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 w-full hover:bg-muted/50 transition-colors bg-transparent"
                >
                  <div className="flex items-center space-x-2 w-full">
                    <Icon className={`h-5 w-5 ${action.color}`} />
                    <span className="font-semibold text-left">{action.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-left">{action.description}</p>
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
