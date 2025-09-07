import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingDown, Camera } from "lucide-react"

export function ProgressMetricsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progress Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">165.2 lbs</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-primary" />
              -2.3 lbs this week
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Goal: 160 lbs</p>
            <p className="text-xs text-muted-foreground">5.2 lbs to go</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Waist</p>
            <p className="font-semibold">32.5"</p>
          </div>
          <div>
            <p className="text-muted-foreground">Chest</p>
            <p className="font-semibold">42"</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <Camera className="w-4 h-4 mr-2" />
          Add Progress Photo
        </Button>
      </CardContent>
    </Card>
  )
}
