import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, TrendingUp, AlertCircle } from "lucide-react"

export function DayInsightsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Day Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hydration Tracking */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-primary" />
            <span className="font-medium">Hydration</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">6 / 8 glasses</span>
            <Badge variant="outline" className="text-xs">
              75%
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="h-2 rounded-full bg-primary" style={{ width: "75%" }} />
          </div>
        </div>

        {/* Nutritional Insights */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            Insights
          </h4>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <p className="text-sm text-muted-foreground">
                Great protein intake today! You're on track to meet your muscle-building goals.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-accent mt-2" />
              <p className="text-sm text-muted-foreground">
                Consider adding more complex carbs before your evening workout.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-sm text-muted-foreground">
                You're 460 calories below your target. Add a healthy snack.
              </p>
            </div>
          </div>
        </div>

        {/* Macro Balance Analysis */}
        <div className="space-y-2">
          <h4 className="font-medium">Macro Balance</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="text-accent font-semibold">28%</div>
              <div className="text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-chart-2 font-semibold">48%</div>
              <div className="text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-chart-4 font-semibold">24%</div>
              <div className="text-muted-foreground">Fat</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
