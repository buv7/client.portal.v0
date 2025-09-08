"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, Brain, History, FileText, Music, Paperclip, GripVertical, Search } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  weight: string
  rpe: string
  rest: string
  notes: string
  isSuperset: boolean
  isCircuit: boolean
  exerciseHistory?: any[]
  media?: string[]
  tutorialLink?: string
}

interface WorkoutDay {
  id: string
  name: string
  exercises: Exercise[]
  cardio: CardioExercise[]
  notes: string
  musicLinks: string[]
  attachments: string[]
}

interface CardioExercise {
  id: string
  machine: string
  duration: string
  intensity: string
  notes: string
}

interface WorkoutWeek {
  id: string
  name: string
  days: WorkoutDay[]
}

interface WorkoutPlan {
  clientId: string
  planName: string
  startDate: string
  durationWeeks: number
  weeks: WorkoutWeek[]
}

export function WorkoutPlanBuilder() {
  const [plan, setPlan] = useState<WorkoutPlan>({
    clientId: "",
    planName: "",
    startDate: "",
    durationWeeks: 4,
    weeks: [],
  })

  const [selectedExercises, setSelectedExercises] = useState<string[]>([])
  const [isExerciseLibraryOpen, setIsExerciseLibraryOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock client data
  const clients = [
    { id: "1", name: "Mike Johnson" },
    { id: "2", name: "Sarah Chen" },
    { id: "3", name: "David Rodriguez" },
  ]

  // Mock exercise library
  const exerciseLibrary = [
    { id: "1", name: "Barbell Bench Press", category: "Chest", equipment: "Barbell" },
    { id: "2", name: "Incline Dumbbell Press", category: "Chest", equipment: "Dumbbell" },
    { id: "3", name: "Barbell Squat", category: "Legs", equipment: "Barbell" },
    { id: "4", name: "Romanian Deadlift", category: "Legs", equipment: "Barbell" },
    { id: "5", name: "Pull-ups", category: "Back", equipment: "Bodyweight" },
    { id: "6", name: "Barbell Rows", category: "Back", equipment: "Barbell" },
  ]

  const addWeek = () => {
    const newWeek: WorkoutWeek = {
      id: Date.now().toString(),
      name: `Week ${plan.weeks.length + 1}`,
      days: [],
    }
    setPlan({ ...plan, weeks: [...plan.weeks, newWeek] })
  }

  const addDay = (weekId: string) => {
    const newDay: WorkoutDay = {
      id: Date.now().toString(),
      name: `Day ${plan.weeks.find((w) => w.id === weekId)?.days.length + 1 || 1}`,
      exercises: [],
      cardio: [],
      notes: "",
      musicLinks: [],
      attachments: [],
    }

    setPlan({
      ...plan,
      weeks: plan.weeks.map((week) => (week.id === weekId ? { ...week, days: [...week.days, newDay] } : week)),
    })
  }

  const addExercise = (weekId: string, dayId: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      sets: 3,
      reps: "8-12",
      weight: "",
      rpe: "",
      rest: "60-90s",
      notes: "",
      isSuperset: false,
      isCircuit: false,
    }

    setPlan({
      ...plan,
      weeks: plan.weeks.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day) =>
                day.id === dayId ? { ...day, exercises: [...day.exercises, newExercise] } : day,
              ),
            }
          : week,
      ),
    })
  }

  const updateExercise = (weekId: string, dayId: string, exerciseId: string, updates: Partial<Exercise>) => {
    setPlan({
      ...plan,
      weeks: plan.weeks.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day) =>
                day.id === dayId
                  ? {
                      ...day,
                      exercises: day.exercises.map((exercise) =>
                        exercise.id === exerciseId ? { ...exercise, ...updates } : exercise,
                      ),
                    }
                  : day,
              ),
            }
          : week,
      ),
    })
  }

  const deleteExercise = (weekId: string, dayId: string, exerciseId: string) => {
    setPlan({
      ...plan,
      weeks: plan.weeks.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day) =>
                day.id === dayId ? { ...day, exercises: day.exercises.filter((ex) => ex.id !== exerciseId) } : day,
              ),
            }
          : week,
      ),
    })
  }

  const addCardio = (weekId: string, dayId: string) => {
    const newCardio: CardioExercise = {
      id: Date.now().toString(),
      machine: "",
      duration: "20 min",
      intensity: "Moderate",
      notes: "",
    }

    setPlan({
      ...plan,
      weeks: plan.weeks.map((week) =>
        week.id === weekId
          ? {
              ...week,
              days: week.days.map((day) => (day.id === dayId ? { ...day, cardio: [...day.cardio, newCardio] } : day)),
            }
          : week,
      ),
    })
  }

  const savePlan = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Saving plan:", plan)
      setIsSaving(false)
      // Show success message
    }, 2000)
  }

  const calculatePlanSummary = () => {
    const totalDays = plan.weeks.reduce((acc, week) => acc + week.days.length, 0)
    const totalExercises = plan.weeks.reduce(
      (acc, week) => acc + week.days.reduce((dayAcc, day) => dayAcc + day.exercises.length, 0),
      0,
    )
    const totalSets = plan.weeks.reduce(
      (acc, week) =>
        acc + week.days.reduce((dayAcc, day) => dayAcc + day.exercises.reduce((exAcc, ex) => exAcc + ex.sets, 0), 0),
      0,
    )

    return { totalDays, totalExercises, totalSets }
  }

  const summary = calculatePlanSummary()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workout Plan Builder</h1>
          <p className="text-muted-foreground">Create comprehensive workout plans for your clients</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            AI Suggestions
          </Button>
          <Button onClick={savePlan} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Plan"}
          </Button>
        </div>
      </div>

      {/* Plan Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="client">Select Client</Label>
              <Select value={plan.clientId} onValueChange={(value) => setPlan({ ...plan, clientId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
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
                placeholder="e.g., Strength Building Phase 1"
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={plan.startDate}
                onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (weeks)</Label>
              <Input
                id="duration"
                type="number"
                value={plan.durationWeeks}
                onChange={(e) => setPlan({ ...plan, durationWeeks: Number.parseInt(e.target.value) })}
                min="1"
                max="52"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Weeks</p>
              <p className="text-2xl font-bold">{plan.weeks.length}</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Days</p>
              <p className="text-2xl font-bold">{summary.totalDays}</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Exercises</p>
              <p className="text-2xl font-bold">{summary.totalExercises}</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Sets</p>
              <p className="text-2xl font-bold">{summary.totalSets}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Workout Weeks</CardTitle>
            <Button onClick={addWeek}>
              <Plus className="h-4 w-4 mr-2" />
              Add Week
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {plan.weeks.map((week, weekIndex) => (
              <Card key={week.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={week.name}
                        onChange={(e) =>
                          setPlan({
                            ...plan,
                            weeks: plan.weeks.map((w, i) => (i === weekIndex ? { ...w, name: e.target.value } : w)),
                          })
                        }
                        className="font-semibold bg-transparent border-none p-0 h-auto"
                      />
                      <Badge variant="outline">{week.days.length} days</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" onClick={() => addDay(week.id)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Day
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPlan({ ...plan, weeks: plan.weeks.filter((w) => w.id !== week.id) })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {week.days.map((day, dayIndex) => (
                      <Card key={day.id} className="bg-muted/30">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Input
                                value={day.name}
                                onChange={(e) =>
                                  setPlan({
                                    ...plan,
                                    weeks: plan.weeks.map((w) =>
                                      w.id === week.id
                                        ? {
                                            ...w,
                                            days: w.days.map((d, i) =>
                                              i === dayIndex ? { ...d, name: e.target.value } : d,
                                            ),
                                          }
                                        : w,
                                    ),
                                  })
                                }
                                className="font-medium bg-transparent border-none p-0 h-auto"
                              />
                              <Badge variant="secondary">{day.exercises.length} exercises</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" onClick={() => addExercise(week.id, day.id)}>
                                <Plus className="h-4 w-4 mr-1" />
                                Add Exercise
                              </Button>
                              <Dialog open={isExerciseLibraryOpen} onOpenChange={setIsExerciseLibraryOpen}>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Search className="h-4 w-4 mr-1" />
                                    Exercise Library
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Exercise Library</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Input placeholder="Search exercises..." />
                                    <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                                      {exerciseLibrary.map((exercise) => (
                                        <div
                                          key={exercise.id}
                                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                                        >
                                          <div>
                                            <h4 className="font-medium">{exercise.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                              {exercise.category} • {exercise.equipment}
                                            </p>
                                          </div>
                                          <Button
                                            size="sm"
                                            onClick={() => {
                                              const newExercise: Exercise = {
                                                id: Date.now().toString(),
                                                name: exercise.name,
                                                sets: 3,
                                                reps: "8-12",
                                                weight: "",
                                                rpe: "",
                                                rest: "60-90s",
                                                notes: "",
                                                isSuperset: false,
                                                isCircuit: false,
                                              }
                                              updateExercise(week.id, day.id, newExercise.id, newExercise)
                                              addExercise(week.id, day.id)
                                            }}
                                          >
                                            Add
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {/* Exercises */}
                          <div className="space-y-3">
                            {day.exercises.map((exercise, exerciseIndex) => (
                              <div key={exercise.id} className="p-4 bg-background rounded-lg border">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        checked={selectedExercises.includes(exercise.id)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            setSelectedExercises([...selectedExercises, exercise.id])
                                          } else {
                                            setSelectedExercises(selectedExercises.filter((id) => id !== exercise.id))
                                          }
                                        }}
                                      />
                                      <Input
                                        value={exercise.name}
                                        onChange={(e) =>
                                          updateExercise(week.id, day.id, exercise.id, { name: e.target.value })
                                        }
                                        placeholder="Exercise name"
                                        className="font-medium"
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Button size="sm" variant="ghost">
                                        <Brain className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost">
                                        <History className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost">
                                        <FileText className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => deleteExercise(week.id, day.id, exercise.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                                    <div>
                                      <Label className="text-xs">Sets</Label>
                                      <Input
                                        type="number"
                                        value={exercise.sets}
                                        onChange={(e) =>
                                          updateExercise(week.id, day.id, exercise.id, {
                                            sets: Number.parseInt(e.target.value),
                                          })
                                        }
                                        min="1"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs">Reps</Label>
                                      <Input
                                        value={exercise.reps}
                                        onChange={(e) =>
                                          updateExercise(week.id, day.id, exercise.id, { reps: e.target.value })
                                        }
                                        placeholder="8-12"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs">Weight</Label>
                                      <Input
                                        value={exercise.weight}
                                        onChange={(e) =>
                                          updateExercise(week.id, day.id, exercise.id, { weight: e.target.value })
                                        }
                                        placeholder="135 lbs"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs">RPE</Label>
                                      <Input
                                        value={exercise.rpe}
                                        onChange={(e) =>
                                          updateExercise(week.id, day.id, exercise.id, { rpe: e.target.value })
                                        }
                                        placeholder="7-8"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs">Rest</Label>
                                      <Input
                                        value={exercise.rest}
                                        onChange={(e) =>
                                          updateExercise(week.id, day.id, exercise.id, { rest: e.target.value })
                                        }
                                        placeholder="60-90s"
                                      />
                                    </div>
                                    <div className="flex items-end space-x-2">
                                      <Checkbox
                                        checked={exercise.isSuperset}
                                        onCheckedChange={(checked) =>
                                          updateExercise(week.id, day.id, exercise.id, { isSuperset: !!checked })
                                        }
                                      />
                                      <Label className="text-xs">Superset</Label>
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-xs">Notes</Label>
                                    <Textarea
                                      value={exercise.notes}
                                      onChange={(e) =>
                                        updateExercise(week.id, day.id, exercise.id, { notes: e.target.value })
                                      }
                                      placeholder="Exercise notes, form cues, etc."
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Combo Set Controls */}
                          {selectedExercises.length > 1 && (
                            <Card className="mt-4 border-accent">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Combo Set Controls</span>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      Superset
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Circuit
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Drop Set
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Giant Set
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {/* Cardio Section */}
                          <div className="mt-6">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">Cardio</h4>
                              <Button size="sm" onClick={() => addCardio(week.id, day.id)}>
                                <Plus className="h-4 w-4 mr-1" />
                                Add Cardio
                              </Button>
                            </div>
                            {day.cardio.map((cardio) => (
                              <div key={cardio.id} className="p-3 bg-muted/30 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                  <Input value={cardio.machine} placeholder="Machine/Type" />
                                  <Input value={cardio.duration} placeholder="Duration" />
                                  <Input value={cardio.intensity} placeholder="Intensity" />
                                  <Button size="sm" variant="ghost">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Attachments */}
                          <div className="mt-6 space-y-3">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Music className="h-4 w-4 mr-1" />
                                Add Music
                              </Button>
                              <Button size="sm" variant="outline">
                                <Paperclip className="h-4 w-4 mr-1" />
                                Attach Files
                              </Button>
                            </div>

                            <div>
                              <Label className="text-xs">Day Notes</Label>
                              <Textarea value={day.notes} placeholder="Notes for this workout day..." rows={2} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
