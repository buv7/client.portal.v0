import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Clock } from "lucide-react"

export function SupplementTodayCard() {
  const supplements = [
    { name: "Protein Powder", time: "Morning", taken: true },
    { name: "Creatine", time: "Pre-workout", taken: false },
    { name: "Multivitamin", time: "Evening", taken: false },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Supplements Today</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {supplements.map((supplement, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{supplement.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {supplement.time}
              </p>
            </div>
            <Button
              size="sm"
              variant={supplement.taken ? "default" : "outline"}
              className={supplement.taken ? "bg-primary" : "bg-transparent"}
            >
              {supplement.taken ? <Check className="w-4 h-4" /> : "Mark Taken"}
            </Button>
          </div>
        ))}

        <Button variant="ghost" size="sm" className="w-full mt-4">
          View All Supplements
        </Button>
      </CardContent>
    </Card>
  )
}
