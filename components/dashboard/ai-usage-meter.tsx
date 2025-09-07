import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Zap } from "lucide-react"

export function AIUsageMeter() {
  const usage = 45
  const limit = 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Requests Used</span>
            <span className="text-muted-foreground">
              {usage}/{limit}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${(usage / limit) * 100}%` }} />
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">{limit - usage} requests remaining this month</div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <Zap className="w-4 h-4 mr-2" />
          Upgrade for More
        </Button>
      </CardContent>
    </Card>
  )
}
