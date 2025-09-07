import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HealthRingsWidget() {
  const rings = [
    { label: "Activity", value: 75, max: 100, color: "text-primary", bgColor: "text-primary/20" },
    { label: "Exercise", value: 45, max: 60, color: "text-accent", bgColor: "text-accent/20" },
    { label: "Stand", value: 8, max: 12, color: "text-destructive", bgColor: "text-destructive/20" },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium">Health Rings</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-center">
        <div className="space-y-2">
          {rings.map((ring) => (
            <div key={ring.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{ring.label}</span>
                <span className="text-muted-foreground">
                  {ring.value}/{ring.max}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div
                  className={`h-1 rounded-full bg-current ${ring.color}`}
                  style={{ width: `${(ring.value / ring.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
