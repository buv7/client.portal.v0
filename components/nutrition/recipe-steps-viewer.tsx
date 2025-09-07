"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, X } from "lucide-react"

interface RecipeStepsViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RecipeStepsViewer({ open, onOpenChange }: RecipeStepsViewerProps) {
  const recipe = {
    title: "Protein Power Smoothie",
    time: "5 minutes",
    servings: 1,
    isHalal: true,
    steps: [
      {
        number: 1,
        instruction: "Add 1 cup of cold water or almond milk to your blender.",
        image: null,
      },
      {
        number: 2,
        instruction: "Add 1 scoop of vanilla whey protein powder to the liquid.",
        image: null,
      },
      {
        number: 3,
        instruction: "Add 1/2 frozen banana and 1/2 cup mixed berries for natural sweetness.",
        image: null,
      },
      {
        number: 4,
        instruction: "Add 1 tablespoon of almond butter for healthy fats and creaminess.",
        image: null,
      },
      {
        number: 5,
        instruction: "Blend on high speed for 60-90 seconds until smooth and creamy.",
        image: null,
      },
      {
        number: 6,
        instruction: "Pour into a glass and enjoy immediately for best taste and texture.",
        image: null,
      },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-left">{recipe.title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipe Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} serving</span>
            </div>
            {recipe.isHalal && (
              <Badge variant="secondary" className="text-xs">
                Halal
              </Badge>
            )}
          </div>

          {/* Recipe Steps */}
          <div className="space-y-4">
            {recipe.steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {step.number}
                </div>

                <div className="flex-1 space-y-2">
                  <p className="text-sm">{step.instruction}</p>
                  {step.image && (
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Step {step.number} Photo</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
