import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock } from "lucide-react"

export function UpcomingSessionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Session</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/diverse-fitness-coach.png" />
            <AvatarFallback className="bg-primary text-primary-foreground">SM</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Upper Body Strength</p>
            <p className="text-sm text-muted-foreground">with Coach Sarah</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Today, March 15</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>2:00 PM - 3:00 PM</span>
          </div>
        </div>

        <Button className="w-full">Join Session</Button>
      </CardContent>
    </Card>
  )
}
