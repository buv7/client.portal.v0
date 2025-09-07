import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star } from "lucide-react"

export function RankLevelCard() {
  return (
    <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Rank & Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">Gold Tier</div>
            <p className="text-sm text-muted-foreground">Level 8</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP Progress</span>
              <span className="text-muted-foreground">2,340 / 3,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="h-2 rounded-full bg-accent" style={{ width: "78%" }} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-accent" />
            <span>660 XP to next level</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
