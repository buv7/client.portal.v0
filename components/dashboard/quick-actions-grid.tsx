import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, UtensilsCrossed, Camera, MessageCircle, Calendar } from "lucide-react"

export function QuickActionsGrid() {
  const actions = [
    { icon: Dumbbell, label: "Start Workout", href: "/workouts/start" },
    { icon: UtensilsCrossed, label: "Log Meal", href: "/nutrition/log" },
    { icon: Camera, label: "Progress Photo", href: "/progress/photo" },
    { icon: MessageCircle, label: "Message Coach", href: "/messages" },
    { icon: Calendar, label: "View Calendar", href: "/calendar" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.slice(0, 4).map((action) => {
            const Icon = action.icon
            return (
              <Button key={action.href} variant="outline" className="h-16 flex-col gap-2 bg-transparent">
                <Icon className="w-5 h-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            )
          })}
        </div>

        <Button variant="ghost" className="w-full mt-3" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          View Calendar
        </Button>
      </CardContent>
    </Card>
  )
}
