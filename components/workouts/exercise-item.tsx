"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Play, Paperclip, MessageSquare } from "lucide-react"
import { SetCompletionChips } from "./set-completion-chips"
import { ExerciseDetailSheet } from "./exercise-detail-sheet"

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

interface ExerciseItemProps {
  exercise: Exercise
}

export function ExerciseItem({ exercise }: ExerciseItemProps) {
  const [comment, setComment] = useState("")
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <div className="border rounded-lg p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto font-semibold text-left"
                onClick={() => setShowDetails(true)}
              >
                {exercise.name}
              </Button>
              {exercise.hasVideo && (
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <Play className="w-4 h-4 text-primary" />
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{exercise.sets} sets</Badge>
              <Badge variant="outline">{exercise.reps} reps</Badge>
              <Badge variant="outline">{exercise.rest} rest</Badge>
              <Badge variant="outline">{exercise.oneRM}</Badge>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="p-1">
            <Paperclip className="w-4 h-4" />
          </Button>
        </div>

        {/* Set Completion */}
        <SetCompletionChips exercise={exercise} />

        {/* Comment Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Notes</span>
          </div>
          <Textarea
            placeholder="Add your notes about this exercise..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[60px] resize-none"
          />
        </div>
      </div>

      <ExerciseDetailSheet exercise={exercise} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}
