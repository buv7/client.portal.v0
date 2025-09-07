import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

export function StreakCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="w-5 h-5 text-accent" />
          Workout Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-accent">12</div>
          <p className="text-sm text-muted-foreground">Days in a row</p>

          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div className="h-2 rounded-full bg-accent" style={{ width: "80%" }} />
          </div>
          <p className="text-xs text-muted-foreground">8 more days to beat your record!</p>
        </div>
      </CardContent>
    </Card>
  )
}
