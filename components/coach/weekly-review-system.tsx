"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Send, Edit, Check, X } from "lucide-react"

interface WeeklyReviewSystemProps {
  clientId: string
}

export function WeeklyReviewSystem({ clientId }: WeeklyReviewSystemProps) {
  const [activeWeek, setActiveWeek] = useState("current")
  const [editingReview, setEditingReview] = useState<string | null>(null)

  // Mock review data - replace with actual API call
  const reviews = [
    {
      id: "1",
      week: "Week 8",
      date: "2024-02-26",
      status: "pending",
      workoutCompliance: 85,
      nutritionCompliance: 78,
      coachNotes: "",
      clientFeedback: "Feeling stronger this week! Had some challenges with meal prep on Wednesday.",
      goals: ["Continue current workout intensity", "Improve meal prep consistency"],
      nextWeekFocus: "Focus on meal prep planning and consistency",
    },
    {
      id: "2",
      week: "Week 7",
      date: "2024-02-19",
      status: "completed",
      workoutCompliance: 92,
      nutritionCompliance: 88,
      coachNotes:
        "Excellent progress this week! Sarah is showing great consistency and her form has improved significantly. Weight loss is on track.",
      clientFeedback: "Great week overall! Feeling more confident with the exercises.",
      goals: ["Increase workout intensity", "Maintain nutrition consistency"],
      nextWeekFocus: "Progressive overload on strength exercises",
    },
    {
      id: "3",
      week: "Week 6",
      date: "2024-02-12",
      status: "completed",
      workoutCompliance: 75,
      nutritionCompliance: 82,
      coachNotes:
        "Good week with some minor setbacks. Sarah missed one workout due to work commitments but made up for it with extra cardio.",
      clientFeedback: "Busy work week but managed to stay mostly on track.",
      goals: ["Improve workout consistency", "Maintain current nutrition plan"],
      nextWeekFocus: "Time management strategies for busy weeks",
    },
  ]

  const currentReview = reviews.find((r) => r.status === "pending") || reviews[0]

  const handleSaveReview = (reviewId: string) => {
    // Save review logic here
    setEditingReview(null)
  }

  return (
    <div className="space-y-6">
      {/* Week Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Select Week:</span>
        {reviews.map((review) => (
          <Button
            key={review.id}
            variant={activeWeek === review.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveWeek(review.id)}
          >
            {review.week}
            {review.status === "pending" && (
              <Badge variant="secondary" className="ml-2">
                Pending
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Current Review */}
      {reviews.map(
        (review) =>
          activeWeek === review.id && (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{review.week} Review</CardTitle>
                    <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={review.status === "completed" ? "default" : "secondary"}>{review.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="metrics" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="planning">Planning</TabsTrigger>
                  </TabsList>

                  <TabsContent value="metrics" className="space-y-4">
                    {/* Compliance Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Workout Compliance</Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${review.workoutCompliance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{review.workoutCompliance}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Nutrition Compliance</Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${review.nutritionCompliance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{review.nutritionCompliance}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating System */}
                    <div className="space-y-2">
                      <Label>Overall Week Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-6 w-6 cursor-pointer text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="feedback" className="space-y-4">
                    {/* Client Feedback */}
                    <div className="space-y-2">
                      <Label>Client Feedback</Label>
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm">{review.clientFeedback}</p>
                      </div>
                    </div>

                    {/* Coach Notes */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Coach Notes</Label>
                        {editingReview !== review.id ? (
                          <Button size="sm" variant="outline" onClick={() => setEditingReview(review.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleSaveReview(review.id)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingReview(null)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {editingReview === review.id ? (
                        <Textarea
                          placeholder="Add your notes about this week's progress..."
                          defaultValue={review.coachNotes}
                          rows={4}
                        />
                      ) : (
                        <div className="p-3 bg-primary/10 rounded-lg min-h-[100px]">
                          <p className="text-sm">{review.coachNotes || "No notes added yet..."}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="planning" className="space-y-4">
                    {/* Goals for Next Week */}
                    <div className="space-y-2">
                      <Label>Goals for Next Week</Label>
                      <div className="space-y-2">
                        {review.goals.map((goal, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Focus Area */}
                    <div className="space-y-2">
                      <Label>Next Week Focus</Label>
                      <Input placeholder="Main focus area for next week..." defaultValue={review.nextWeekFocus} />
                    </div>

                    {/* Action Buttons */}
                    {review.status === "pending" && (
                      <div className="flex gap-2 pt-4">
                        <Button>
                          <Send className="h-4 w-4 mr-2" />
                          Send Review to Client
                        </Button>
                        <Button variant="outline">Save Draft</Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ),
      )}
    </div>
  )
}
