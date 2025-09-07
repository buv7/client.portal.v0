import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Zap } from "lucide-react"

export function AIUsageMeter() {
  const usage = 45
  const limit = 100

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          AI Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Requests Used</span>
              <span className="text-muted-foreground">
                {usage}/{limit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="h-1 rounded-full bg-primary" style={{ width: `${(usage / limit) * 100}%` }} />
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">{limit - usage} requests remaining this month</div>
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent text-xs h-6 mt-2">
          <Zap className="w-3 h-3 mr-1" />
          Upgrade for More
        </Button>
      </CardContent>
    </Card>
  )
}
