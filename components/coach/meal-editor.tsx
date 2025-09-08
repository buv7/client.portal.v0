"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Trash2 } from "lucide-react"

interface Food {
  id: string
  name: string
  quantity: number
  unit: string
  calories: number
  protein: number
  carbs: number
  fat: number
  sodium: number
  potassium: number
}

interface Meal {
  id: string
  name: string
  time: string
  foods: Food[]
  notes: string
}

interface MealEditorProps {
  meal: Meal
  onUpdate: (updates: Partial<Meal>) => void
}

export function MealEditor({ meal, onUpdate }: MealEditorProps) {
  const [isFoodLibraryOpen, setIsFoodLibraryOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock food database
  const foodDatabase = [
    {
      id: "1",
      name: "Chicken Breast (100g)",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      sodium: 74,
      potassium: 256,
    },
    {
      id: "2",
      name: "Brown Rice (1 cup cooked)",
      calories: 216,
      protein: 5,
      carbs: 45,
      fat: 1.8,
      sodium: 10,
      potassium: 84,
    },
    {
      id: "3",
      name: "Broccoli (1 cup)",
      calories: 25,
      protein: 3,
      carbs: 5,
      fat: 0.3,
      sodium: 33,
      potassium: 288,
    },
    {
      id: "4",
      name: "Salmon (100g)",
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      sodium: 59,
      potassium: 363,
    },
    {
      id: "5",
      name: "Sweet Potato (1 medium)",
      calories: 112,
      protein: 2,
      carbs: 26,
      fat: 0.1,
      sodium: 7,
      potassium: 542,
    },
    {
      id: "6",
      name: "Greek Yogurt (1 cup)",
      calories: 130,
      protein: 23,
      carbs: 9,
      fat: 0,
      sodium: 75,
      potassium: 240,
    },
  ]

  const filteredFoods = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const addFood = (foodData: any) => {
    const newFood: Food = {
      id: Date.now().toString(),
      name: foodData.name,
      quantity: 1,
      unit: "serving",
      calories: foodData.calories,
      protein: foodData.protein,
      carbs: foodData.carbs,
      fat: foodData.fat,
      sodium: foodData.sodium,
      potassium: foodData.potassium,
    }
    onUpdate({ foods: [...meal.foods, newFood] })
    setIsFoodLibraryOpen(false)
  }

  const updateFood = (foodId: string, updates: Partial<Food>) => {
    const updatedFoods = meal.foods.map((food) => (food.id === foodId ? { ...food, ...updates } : food))
    onUpdate({ foods: updatedFoods })
  }

  const removeFood = (foodId: string) => {
    const updatedFoods = meal.foods.filter((food) => food.id !== foodId)
    onUpdate({ foods: updatedFoods })
  }

  const calculateMealTotals = () => {
    return meal.foods.reduce(
      (totals, food) => ({
        calories: totals.calories + food.calories * food.quantity,
        protein: totals.protein + food.protein * food.quantity,
        carbs: totals.carbs + food.carbs * food.quantity,
        fat: totals.fat + food.fat * food.quantity,
        sodium: totals.sodium + food.sodium * food.quantity,
        potassium: totals.potassium + food.potassium * food.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 0, potassium: 0 },
    )
  }

  const mealTotals = calculateMealTotals()

  return (
    <div className="space-y-6">
      {/* Meal Totals */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Calories</p>
          <p className="font-bold">{Math.round(mealTotals.calories)}</p>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Protein</p>
          <p className="font-bold">{Math.round(mealTotals.protein)}g</p>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Carbs</p>
          <p className="font-bold">{Math.round(mealTotals.carbs)}g</p>
        </div>
        <div className="text-center p-3 bg-destructive/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Fat</p>
          <p className="font-bold">{Math.round(mealTotals.fat)}g</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">Sodium</p>
          <p className="font-bold">{Math.round(mealTotals.sodium)}mg</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">Potassium</p>
          <p className="font-bold">{Math.round(mealTotals.potassium)}mg</p>
        </div>
      </div>

      {/* Add Food Button */}
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Foods</h4>
        <Dialog open={isFoodLibraryOpen} onOpenChange={setIsFoodLibraryOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Food
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Food Database</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                {filteredFoods.map((food) => (
                  <div key={food.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{food.name}</h4>
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span>{food.calories} cal</span>
                        <span>{food.protein}g protein</span>
                        <span>{food.carbs}g carbs</span>
                        <span>{food.fat}g fat</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => addFood(food)}>
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Foods List */}
      <div className="space-y-3">
        {meal.foods.map((food) => (
          <div key={food.id} className="p-4 bg-muted/20 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-3 items-center">
              <div className="md:col-span-2">
                <Input
                  value={food.name}
                  onChange={(e) => updateFood(food.id, { name: e.target.value })}
                  placeholder="Food name"
                />
              </div>
              <div>
                <Label className="text-xs">Quantity</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={food.quantity}
                  onChange={(e) => updateFood(food.id, { quantity: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label className="text-xs">Unit</Label>
                <Input value={food.unit} onChange={(e) => updateFood(food.id, { unit: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs">Calories</Label>
                <Input
                  type="number"
                  value={food.calories}
                  onChange={(e) => updateFood(food.id, { calories: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label className="text-xs">Protein (g)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={food.protein}
                  onChange={(e) => updateFood(food.id, { protein: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label className="text-xs">Carbs (g)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={food.carbs}
                  onChange={(e) => updateFood(food.id, { carbs: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="flex items-end">
                <Button size="sm" variant="ghost" onClick={() => removeFood(food.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Meal Notes */}
      <div>
        <Label htmlFor="mealNotes">Meal Notes</Label>
        <Textarea
          id="mealNotes"
          value={meal.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Special instructions, preparation notes, etc."
          rows={3}
        />
      </div>
    </div>
  )
}
