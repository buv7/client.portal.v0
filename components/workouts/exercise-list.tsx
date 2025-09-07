"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Calendar, Paperclip } from "lucide-react"
import { ExerciseItem } from "./exercise-item"

interface ExerciseListProps {
  week: number
  searchQuery: string
}

export function ExerciseList({ week, searchQuery }: ExerciseListProps) {
  const [openDays, setOpenDays] = useState<number[]>([1])

  const weekData = [
    {
      day: 1,
      name: "Upper Body Strength",
      date: "Monday",
      attachments: 2,
      volume: "12 sets • 45 min",
      exercises: [
        {
          id: 1,
          name: "Bench Press",
          sets: 4,
          reps: "8-10",
          rest: "2-3 min",
          oneRM: "85%",
          completed: [true, true, false, false],
          hasVideo: true,
        },
        {
          id: 2,
          name: "Incline Dumbbell Press",
          sets: 3,
          reps: "10-12",
          rest: "90 sec",
          oneRM: "75%",
          completed: [true, false, false],
          hasVideo: true,
        },
        {
          id: 3,
          name: "Pull-ups",
          sets: 3,
          reps: "8-12",
          rest: "2 min",
          oneRM: "BW",
          completed: [false, false, false],
          hasVideo: true,
        },
      ],
    },
    {
      day: 2,
      name: "Lower Body Power",
      date: "Wednesday",
      attachments: 1,
      volume: "10 sets • 40 min",
      exercises: [
        {
          id: 4,
          name: "Squats",
          sets: 4,
          reps: "6-8",
          rest: "3 min",
          oneRM: "90%",
          completed: [false, false, false, false],
          hasVideo: true,
        },
        {
          id: 5,
          name: "Romanian Deadlifts",
          sets: 3,
          reps: "8-10",
          rest: "2 min",
          oneRM: "80%",
          completed: [false, false, false],
          hasVideo: true,
        },
      ],
    },
    {
      day: 3,
      name: "Upper Body Hypertrophy",
      date: "Friday",
      attachments: 0,
      volume: "15 sets • 50 min",
      exercises: [
        {
          id: 6,
          name: "Dumbbell Rows",
          sets: 4,
          reps: "10-12",
          rest: "90 sec",
          oneRM: "70%",
          completed: [false, false, false, false],
          hasVideo: true,
        },
      ],
    },
  ]

  const toggleDay = (day: number) => {
    setOpenDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const filteredData = weekData.filter(
    (day) =>
      searchQuery === "" || day.exercises.some((ex) => ex.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      {filteredData.map((dayData) => (
        <Card key={dayData.day}>
          <Collapsible open={openDays.includes(dayData.day)} onOpenChange={() => toggleDay(dayData.day)}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full p-6 h-auto justify-start">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    {openDays.includes(dayData.day) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{dayData.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {dayData.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{dayData.volume}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {dayData.attachments > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <Paperclip className="w-3 h-3 mr-1" />
                        {dayData.attachments}
                      </Badge>
                    )}
                  </div>
                </div>
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {dayData.exercises.map((exercise) => (
                    <ExerciseItem key={exercise.id} exercise={exercise} />
                  ))}

                  {/* Cardio Section */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm mb-2">Cardio (Optional)</h4>
                    <div className="text-sm text-muted-foreground">
                      10-15 minutes moderate intensity • Treadmill or bike
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}
