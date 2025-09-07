"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play, Pause, SkipForward } from "lucide-react"

interface RestTimerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  duration: string
  nextExercise: string
}

export function RestTimer({ open, onOpenChange, duration, nextExercise }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [initialTime, setInitialTime] = useState(0)

  // Parse duration string (e.g., "2-3 min" -> 150 seconds)
  useEffect(() => {
    if (open) {
      const parseTime = (duration: string) => {
        const match = duration.match(/(\d+)(?:-(\d+))?\s*(min|sec)/i)
        if (match) {
          const [, min1, min2, unit] = match
          const avgTime = min2 ? (Number.parseInt(min1) + Number.parseInt(min2)) / 2 : Number.parseInt(min1)
          return unit.toLowerCase() === "min" ? avgTime * 60 : avgTime
        }
        return 120 // default 2 minutes
      }

      const seconds = parseTime(duration)
      setTimeLeft(seconds)
      setInitialTime(seconds)
      setIsRunning(true)
    }
  }, [open, duration])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false)
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0

  const handleSkip = () => {
    setIsRunning(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle>Rest Timer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{formatTime(timeLeft)}</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Next Exercise Hint */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Next up:</p>
              <p className="font-medium">{nextExercise}</p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setIsRunning(!isRunning)} className="bg-transparent">
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? "Pause" : "Resume"}
              </Button>

              <Button variant="outline" onClick={handleSkip} className="bg-transparent">
                <SkipForward className="w-4 h-4 mr-2" />
                Skip
              </Button>
            </div>

            {/* Auto-start notification */}
            {timeLeft === 0 && (
              <div className="text-center text-sm text-primary">Rest complete! Ready for your next set?</div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
