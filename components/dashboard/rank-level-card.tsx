import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star } from "lucide-react"

export function RankLevelCard() {
  return (
    <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Trophy className="w-4 h-4 text-accent" />
          Rank & Level
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-center">
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-lg font-bold text-accent mb-1">Gold Tier</div>
            <p className="text-xs text-muted-foreground">Level 8</p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>XP Progress</span>
              <span className="text-muted-foreground">2,340 / 3,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="h-1 rounded-full bg-accent" style={{ width: "78%" }} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 text-accent" />
            <span>660 XP to next level</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
