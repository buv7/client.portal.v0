"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Paperclip, MessageSquare } from "lucide-react"
import { RecipeStepsViewer } from "./recipe-steps-viewer"

interface MealDetailSheetProps {
  meal: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MealDetailSheet({ meal, open, onOpenChange }: MealDetailSheetProps) {
  const [comment, setComment] = useState("")
  const [showRecipe, setShowRecipe] = useState(false)

  if (!meal) return null

  const foodItems = [
    { name: "Oatmeal", amount: "1 cup", protein: 6, carbs: 27, fat: 3, calories: 150, isRecipe: false },
    { name: "Greek Yogurt", amount: "150g", protein: 15, carbs: 8, fat: 10, calories: 170, isRecipe: false },
    { name: "Mixed Berries", amount: "1/2 cup", protein: 1, carbs: 12, fat: 0, calories: 50, isRecipe: false },
    { name: "Almond Butter", amount: "1 tbsp", protein: 4, carbs: 3, fat: 9, calories: 100, isRecipe: false },
    { name: "Protein Smoothie", amount: "1 serving", protein: 25, carbs: 15, fat: 5, calories: 200, isRecipe: true },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left flex items-center gap-2">
              {meal.name}
              <Badge variant="secondary">{meal.type}</Badge>
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Meal Image */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-muted-foreground" />
            </div>

            {/* Coach Notes */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Coach Notes</h3>
                <p className="text-sm text-muted-foreground">
                  This balanced breakfast provides sustained energy for your morning workout. The combination of complex
                  carbs and protein will fuel your training session.
                </p>
              </CardContent>
            </Card>

            {/* Food Items */}
            <div className="space-y-3">
              <h3 className="font-semibold">Food Items</h3>
              {foodItems.map((item, index) => (
                <Card key={index} className={item.isRecipe ? "border-primary/20 bg-primary/5" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        {item.isRecipe && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-primary"
                            onClick={() => setShowRecipe(true)}
                          >
                            See Steps
                          </Button>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{item.amount}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Protein</p>
                        <p className="font-medium">{item.protein}g</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carbs</p>
                        <p className="font-medium">{item.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fat</p>
                        <p className="font-medium">{item.fat}g</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Calories</p>
                        <p className="font-medium">{item.calories}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Meal Summary */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Meal Summary</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{meal.calories}</p>
                    <p className="text-xs text-muted-foreground">Calories</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{meal.protein}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chart-2">{meal.carbs}g</p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chart-4">{meal.fat}g</p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                Attachments
              </h3>
              <div className="text-sm text-muted-foreground">No attachments for this meal</div>
            </div>

            {/* Client Comments */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Your Notes
              </h3>
              <Textarea
                placeholder="Add your notes about this meal..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <RecipeStepsViewer open={showRecipe} onOpenChange={setShowRecipe} />
    </>
  )
}
