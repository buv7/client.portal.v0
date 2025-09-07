"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Utensils } from "lucide-react"
import { MealDetailSheet } from "./meal-detail-sheet"

export function MealsSection() {
  const [selectedMeal, setSelectedMeal] = useState<any>(null)

  const meals = [
    {
      id: 1,
      name: "Power Breakfast Bowl",
      type: "Breakfast",
      time: "7:00 AM",
      calories: 520,
      protein: 28,
      carbs: 45,
      fat: 22,
      image: "/breakfast-bowl.jpg",
    },
    {
      id: 2,
      name: "Pre-Workout Snack",
      type: "Snack",
      time: "10:00 AM",
      calories: 180,
      protein: 8,
      carbs: 25,
      fat: 5,
      image: "/pre-workout-snack.jpg",
    },
    {
      id: 3,
      name: "Grilled Chicken & Rice",
      type: "Lunch",
      time: "1:00 PM",
      calories: 680,
      protein: 45,
      carbs: 65,
      fat: 18,
      image: "/chicken-rice.jpg",
    },
    {
      id: 4,
      name: "Post-Workout Shake",
      type: "Snack",
      time: "4:00 PM",
      calories: 320,
      protein: 35,
      carbs: 28,
      fat: 8,
      image: "/protein-shake.jpg",
    },
    {
      id: 5,
      name: "Salmon & Vegetables",
      type: "Dinner",
      time: "7:00 PM",
      calories: 580,
      protein: 42,
      carbs: 35,
      fat: 28,
      image: "/salmon-vegetables.jpg",
    },
    {
      id: 6,
      name: "Evening Casein",
      type: "Snack",
      time: "10:00 PM",
      calories: 220,
      protein: 25,
      carbs: 8,
      fat: 9,
      image: "/casein-shake.jpg",
    },
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {meals.map((meal) => (
              <Button
                key={meal.id}
                variant="outline"
                className="h-auto p-4 bg-transparent justify-start"
                onClick={() => setSelectedMeal(meal)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-muted-foreground" />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{meal.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {meal.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{meal.time}</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {meal.calories} cal • {meal.protein}g protein
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <MealDetailSheet meal={selectedMeal} open={!!selectedMeal} onOpenChange={() => setSelectedMeal(null)} />
    </>
  )
}
