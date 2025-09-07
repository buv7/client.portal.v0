"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Timer } from "lucide-react"
import { RestTimer } from "./rest-timer"

interface Exercise {
  id: number
  name: string
  sets: number
  reps: string
  rest: string
  oneRM: string
  completed: boolean[]
  hasVideo: boolean
}

interface SetCompletionChipsProps {
  exercise: Exercise
}

export function SetCompletionChips({ exercise }: SetCompletionChipsProps) {
  const [completedSets, setCompletedSets] = useState(exercise.completed)
  const [showRestTimer, setShowRestTimer] = useState(false)
  const [currentSet, setCurrentSet] = useState(0)

  const toggleSet = (setIndex: number) => {
    const newCompleted = [...completedSets]
    newCompleted[setIndex] = !newCompleted[setIndex]
    setCompletedSets(newCompleted)

    // Show rest timer if set was just completed and it's not the last set
    if (newCompleted[setIndex] && setIndex < exercise.sets - 1) {
      setCurrentSet(setIndex)
      setShowRestTimer(true)
    }
  }

  const nextSet = completedSets.findIndex((completed) => !completed)

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: exercise.sets }, (_, i) => (
            <Button
              key={i}
              variant={completedSets[i] ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSet(i)}
              className={`${completedSets[i] ? "bg-primary text-primary-foreground" : "bg-transparent"} min-w-[60px]`}
            >
              {completedSets[i] ? <Check className="w-4 h-4 mr-1" /> : null}
              Set {i + 1}
            </Button>
          ))}
        </div>

        {/* Next Set Hint */}
        {nextSet !== -1 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span>
              Next: Set {nextSet + 1} • {exercise.reps} reps @ {exercise.oneRM}
            </span>
          </div>
        )}

        {/* Completion Status */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {completedSets.filter(Boolean).length}/{exercise.sets} sets completed
          </Badge>
          {completedSets.every(Boolean) && <Badge className="text-xs bg-primary">Exercise Complete!</Badge>}
        </div>
      </div>

      <RestTimer
        open={showRestTimer}
        onOpenChange={setShowRestTimer}
        duration={exercise.rest}
        nextExercise={`Set ${currentSet + 2} of ${exercise.name}`}
      />
    </>
  )
}
