import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dumbbell, UtensilsCrossed, Camera, MessageCircle } from "lucide-react"

export function RecentActivityFeed() {
  const activities = [
    {
      type: "workout",
      icon: Dumbbell,
      title: "Completed Upper Body Workout",
      description: "45 minutes • 12 exercises",
      time: "2 hours ago",
    },
    {
      type: "nutrition",
      icon: UtensilsCrossed,
      title: "Logged Lunch",
      description: "Grilled chicken salad • 450 calories",
      time: "4 hours ago",
    },
    {
      type: "progress",
      icon: Camera,
      title: "Added Progress Photo",
      description: "Weekly check-in photo",
      time: "1 day ago",
    },
    {
      type: "message",
      icon: MessageCircle,
      title: "Message from Coach Sarah",
      description: "Great job on yesterday's workout!",
      time: "2 days ago",
      avatar: "/diverse-fitness-coach.png",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex items-start gap-3">
              {activity.avatar ? (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}

        <Button variant="ghost" size="sm" className="w-full mt-4">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
