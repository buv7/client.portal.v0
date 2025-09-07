"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Play, Check, MessageSquare, Paperclip } from "lucide-react"

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

interface ExerciseDetailSheetProps {
  exercise: Exercise
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExerciseDetailSheet({ exercise, open, onOpenChange }: ExerciseDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left">{exercise.name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Video/Tutorial Section */}
          <div className="space-y-3">
            <h3 className="font-semibold">Tutorial</h3>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <Button size="lg" className="rounded-full w-16 h-16">
                <Play className="w-6 h-6" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Proper form demonstration and technique tips for {exercise.name.toLowerCase()}.
            </p>
          </div>

          {/* Exercise Details */}
          <div className="space-y-3">
            <h3 className="font-semibold">Exercise Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Sets</p>
                <p className="font-medium">{exercise.sets}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reps</p>
                <p className="font-medium">{exercise.reps}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rest</p>
                <p className="font-medium">{exercise.rest}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Intensity</p>
                <p className="font-medium">{exercise.oneRM}</p>
              </div>
            </div>
          </div>

          {/* Notes & Tips */}
          <div className="space-y-3">
            <h3 className="font-semibold">Notes & Tips</h3>
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <ul className="space-y-2">
                <li>• Focus on controlled movement throughout the full range of motion</li>
                <li>• Keep your core engaged and maintain proper posture</li>
                <li>• Breathe out during the exertion phase, breathe in during the lowering phase</li>
                <li>• If you can't complete all reps with good form, reduce the weight</li>
              </ul>
            </div>
          </div>

          {/* Personal Notes */}
          <div className="space-y-3">
            <h3 className="font-semibold">Your Notes</h3>
            <Textarea
              placeholder="Add your personal notes about this exercise..."
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1">
              <Check className="w-4 h-4 mr-2" />
              Mark as Done
            </Button>
            <Button variant="outline" className="bg-transparent">
              <MessageSquare className="w-4 h-4 mr-2" />
              Add Note
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Paperclip className="w-4 h-4 mr-2" />
              Attach Media
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
