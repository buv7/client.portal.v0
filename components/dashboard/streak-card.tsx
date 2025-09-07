import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

export function StreakCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Flame className="w-4 h-4 text-accent" />
          Workout Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-center">
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-accent">12</div>
          <p className="text-xs text-muted-foreground">Days in a row</p>

          <div className="w-full bg-muted rounded-full h-1 mt-2">
            <div className="h-1 rounded-full bg-accent" style={{ width: "80%" }} />
          </div>
          <p className="text-xs text-muted-foreground">8 more days to beat your record!</p>
        </div>
      </CardContent>
    </Card>
  )
}
