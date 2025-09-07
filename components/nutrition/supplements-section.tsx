"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"

export function SupplementsSection() {
  const supplements = [
    { name: "Whey Protein", timing: "Post-workout", taken: true },
    { name: "Creatine", timing: "Daily", taken: false },
    { name: "Multivitamin", timing: "Morning", taken: true },
    { name: "Omega-3", timing: "With meals", taken: false },
    { name: "Vitamin D", timing: "Morning", taken: true },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Supplements</CardTitle>
          <Button size="sm" variant="outline" className="bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Add Supplement
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {supplements.map((supplement, index) => (
            <div key={index} className="group relative">
              <Badge
                variant={supplement.taken ? "default" : "outline"}
                className={`${supplement.taken ? "bg-primary" : "bg-transparent"} pr-8`}
              >
                {supplement.name} • {supplement.timing}
              </Badge>

              <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
