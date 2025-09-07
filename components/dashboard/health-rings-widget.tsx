import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HealthRingsWidget() {
  const rings = [
    { label: "Activity", value: 75, max: 100, color: "text-primary", bgColor: "text-primary/20" },
    { label: "Exercise", value: 45, max: 60, color: "text-accent", bgColor: "text-accent/20" },
    { label: "Stand", value: 8, max: 12, color: "text-destructive", bgColor: "text-destructive/20" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Health Rings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rings.map((ring) => (
            <div key={ring.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{ring.label}</span>
                <span className="text-muted-foreground">
                  {ring.value}/{ring.max}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-current ${ring.color}`}
                  style={{ width: `${(ring.value / ring.max) * 100}%` }}
                />
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {Math.round((ring.value / ring.max) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
