"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2, Brain, FileDown, Copy, Utensils, Zap } from "lucide-react"
import { MealEditor } from "./meal-editor"

interface Meal {
  id: string
  name: string
  time: string
  foods: Food[]
  notes: string
}

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

interface NutritionPlan {
  clientId: string
  planName: string
  lengthType: "daily" | "weekly" | "program"
  meals: Meal[]
  targetMacros: {
    protein: number
    carbs: number
    fat: number
    calories: number
  }
}

export function NutritionPlanBuilder() {
  const [plan, setPlan] = useState<NutritionPlan>({
    clientId: "",
    planName: "",
    lengthType: "daily",
    meals: [],
    targetMacros: {
      protein: 150,
      carbs: 200,
      fat: 80,
      calories: 2000,
    },
  })

  const [aiUsage, setAiUsage] = useState({ used: 45, limit: 100 })
  const [isGeneratingMeal, setIsGeneratingMeal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null)

  // Mock client data
  const clients = [
    { id: "1", name: "Mike Johnson", goals: "Muscle Gain", weight: 185, activity: "High" },
    { id: "2", name: "Sarah Chen", goals: "Weight Loss", weight: 140, activity: "Moderate" },
    { id: "3", name: "David Rodriguez", goals: "Maintenance", weight: 175, activity: "Low" },
  ]

  const addMeal = () => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: `Meal ${plan.meals.length + 1}`,
      time: "",
      foods: [],
      notes: "",
    }
    setPlan({ ...plan, meals: [...plan.meals, newMeal] })
  }

  const removeMeal = (mealId: string) => {
    setPlan({ ...plan, meals: plan.meals.filter((meal) => meal.id !== mealId) })
  }

  const updateMeal = (mealId: string, updates: Partial<Meal>) => {
    setPlan({
      ...plan,
      meals: plan.meals.map((meal) => (meal.id === mealId ? { ...meal, ...updates } : meal)),
    })
  }

  const generateAIMeal = async (mealCount: number, targetMacros: any) => {
    setIsGeneratingMeal(true)
    setAiUsage({ ...aiUsage, used: aiUsage.used + 1 })

    // Simulate AI generation
    setTimeout(() => {
      const generatedMeals: Meal[] = []
      const mealNames = ["Breakfast", "Lunch", "Dinner", "Snack 1", "Snack 2"]

      for (let i = 0; i < mealCount; i++) {
        const meal: Meal = {
          id: Date.now().toString() + i,
          name: mealNames[i] || `Meal ${i + 1}`,
          time: i === 0 ? "7:00 AM" : i === 1 ? "12:00 PM" : i === 2 ? "6:00 PM" : `${10 + i}:00 AM`,
          foods: [
            {
              id: `food-${i}-1`,
              name: i === 0 ? "Oatmeal with Berries" : i === 1 ? "Grilled Chicken Salad" : "Salmon with Rice",
              quantity: 1,
              unit: "serving",
              calories: Math.floor(targetMacros.calories / mealCount),
              protein: Math.floor(targetMacros.protein / mealCount),
              carbs: Math.floor(targetMacros.carbs / mealCount),
              fat: Math.floor(targetMacros.fat / mealCount),
              sodium: 300,
              potassium: 400,
            },
          ],
          notes: "AI-generated meal optimized for your goals",
        }
        generatedMeals.push(meal)
      }

      setPlan({ ...plan, meals: generatedMeals })
      setIsGeneratingMeal(false)
    }, 2000)
  }

  const calculateDailySummary = () => {
    return plan.meals.reduce(
      (summary, meal) => {
        const mealTotals = meal.foods.reduce(
          (mealSum, food) => ({
            calories: mealSum.calories + food.calories,
            protein: mealSum.protein + food.protein,
            carbs: mealSum.carbs + food.carbs,
            fat: mealSum.fat + food.fat,
            sodium: mealSum.sodium + food.sodium,
            potassium: mealSum.potassium + food.potassium,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 0, potassium: 0 },
        )

        return {
          calories: summary.calories + mealTotals.calories,
          protein: summary.protein + mealTotals.protein,
          carbs: summary.carbs + mealTotals.carbs,
          fat: summary.fat + mealTotals.fat,
          sodium: summary.sodium + mealTotals.sodium,
          potassium: summary.potassium + mealTotals.potassium,
        }
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 0, potassium: 0 },
    )
  }

  const savePlan = async (notifyClient = false) => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Saving nutrition plan:", plan, "Notify client:", notifyClient)
      setIsSaving(false)
      // Show success message
    }, 1500)
  }

  const exportPDF = () => {
    console.log("Exporting nutrition plan as PDF")
    // Implement PDF export
  }

  const duplicatePlan = () => {
    console.log("Duplicating nutrition plan")
    // Implement plan duplication
  }

  const dailySummary = calculateDailySummary()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nutrition Plan Builder</h1>
          <p className="text-muted-foreground">Create personalized nutrition plans for your clients</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportPDF}>
            <FileDown className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={duplicatePlan}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate Plan
          </Button>
        </div>
      </div>

      {/* AI Usage Meter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">AI Usage</p>
                <p className="text-xs text-muted-foreground">
                  {aiUsage.used}/{aiUsage.limit} requests this month
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={(aiUsage.used / aiUsage.limit) * 100} className="w-32" />
              <Badge variant={aiUsage.used >= aiUsage.limit * 0.8 ? "destructive" : "secondary"}>
                {Math.round(((aiUsage.limit - aiUsage.used) / aiUsage.limit) * 100)}% left
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="client">Select Client</Label>
              <Select value={plan.clientId} onValueChange={(value) => setPlan({ ...plan, clientId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex flex-col">
                        <span>{client.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {client.goals} • {client.weight} lbs • {client.activity} Activity
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                value={plan.planName}
                onChange={(e) => setPlan({ ...plan, planName: e.target.value })}
                placeholder="e.g., Muscle Gain Nutrition"
              />
            </div>
            <div>
              <Label htmlFor="lengthType">Length Type</Label>
              <Select
                value={plan.lengthType}
                onValueChange={(value: "daily" | "weekly" | "program") => setPlan({ ...plan, lengthType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="program">Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Target Macros */}
          <div>
            <Label className="text-base font-semibold">Target Macros</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div>
                <Label htmlFor="protein" className="text-sm">
                  Protein (g)
                </Label>
                <Input
                  id="protein"
                  type="number"
                  value={plan.targetMacros.protein}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      targetMacros: { ...plan.targetMacros, protein: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="carbs" className="text-sm">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs"
                  type="number"
                  value={plan.targetMacros.carbs}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      targetMacros: { ...plan.targetMacros, carbs: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="fat" className="text-sm">
                  Fat (g)
                </Label>
                <Input
                  id="fat"
                  type="number"
                  value={plan.targetMacros.fat}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      targetMacros: { ...plan.targetMacros, fat: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="calories" className="text-sm">
                  Calories
                </Label>
                <Input
                  id="calories"
                  type="number"
                  value={plan.targetMacros.calories}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      targetMacros: { ...plan.targetMacros, calories: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Meal Generation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={isGeneratingMeal || aiUsage.used >= aiUsage.limit}>
                <Brain className="h-4 w-4 mr-2" />
                {isGeneratingMeal ? "Generating..." : "Generate Full Day"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate AI Meal Plan</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mealCount">Number of Meals (1-10)</Label>
                  <Input id="mealCount" type="number" min="1" max="10" defaultValue="3" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aiProtein">Target Protein (g)</Label>
                    <Input id="aiProtein" type="number" defaultValue={plan.targetMacros.protein} />
                  </div>
                  <div>
                    <Label htmlFor="aiCarbs">Target Carbs (g)</Label>
                    <Input id="aiCarbs" type="number" defaultValue={plan.targetMacros.carbs} />
                  </div>
                  <div>
                    <Label htmlFor="aiFat">Target Fat (g)</Label>
                    <Input id="aiFat" type="number" defaultValue={plan.targetMacros.fat} />
                  </div>
                  <div>
                    <Label htmlFor="aiCalories">Target Calories</Label>
                    <Input id="aiCalories" type="number" defaultValue={plan.targetMacros.calories} />
                  </div>
                </div>
                <Button
                  onClick={() => generateAIMeal(3, plan.targetMacros)}
                  className="w-full"
                  disabled={isGeneratingMeal}
                >
                  {isGeneratingMeal ? "Generating..." : "Generate Meals"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Meals Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Utensils className="h-5 w-5" />
              <span>Meals</span>
              <Badge variant="secondary">{plan.meals.length}</Badge>
            </CardTitle>
            <Button onClick={addMeal}>
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plan.meals.map((meal, index) => (
              <Card key={meal.id} className="border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Input
                        value={meal.name}
                        onChange={(e) => updateMeal(meal.id, { name: e.target.value })}
                        className="font-semibold bg-transparent border-none p-0 h-auto"
                      />
                      <Input
                        type="time"
                        value={meal.time}
                        onChange={(e) => updateMeal(meal.id, { time: e.target.value })}
                        className="w-32"
                      />
                      <Badge variant="outline">{meal.foods.length} foods</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMealId(selectedMealId === meal.id ? null : meal.id)}
                      >
                        {selectedMealId === meal.id ? "Close" : "Edit"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeMeal(meal.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {selectedMealId === meal.id && (
                  <CardContent>
                    <MealEditor meal={meal} onUpdate={(updates) => updateMeal(meal.id, updates)} />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Protein</p>
              <p className="text-xl font-bold text-primary">{dailySummary.protein}g</p>
              <p className="text-xs text-muted-foreground">Target: {plan.targetMacros.protein}g</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Carbs</p>
              <p className="text-xl font-bold text-accent">{dailySummary.carbs}g</p>
              <p className="text-xs text-muted-foreground">Target: {plan.targetMacros.carbs}g</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Fat</p>
              <p className="text-xl font-bold text-destructive">{dailySummary.fat}g</p>
              <p className="text-xs text-muted-foreground">Target: {plan.targetMacros.fat}g</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Calories</p>
              <p className="text-xl font-bold">{dailySummary.calories}</p>
              <p className="text-xs text-muted-foreground">Target: {plan.targetMacros.calories}</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Sodium</p>
              <p className="text-xl font-bold">{dailySummary.sodium}mg</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Potassium</p>
              <p className="text-xl font-bold">{dailySummary.potassium}mg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => savePlan(false)} disabled={isSaving}>
          Save Draft
        </Button>
        <Button onClick={() => savePlan(true)} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save & Notify Client"}
        </Button>
      </div>
    </div>
  )
}
