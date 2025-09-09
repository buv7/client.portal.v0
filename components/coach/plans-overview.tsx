"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Dumbbell, Apple, Users, Clock, Star } from "lucide-react"
import Link from "next/link"

interface Plan {
  id: string
  name: string
  type: "workout" | "nutrition"
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  clientsAssigned: number
  rating: number
  createdAt: string
  tags: string[]
}

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Full Body Strength Builder",
    type: "workout",
    description: "A comprehensive 12-week program focusing on building overall strength and muscle mass.",
    duration: "12 weeks",
    difficulty: "Intermediate",
    clientsAssigned: 8,
    rating: 4.8,
    createdAt: "2024-02-15",
    tags: ["Strength", "Muscle Building", "Full Body"],
  },
  {
    id: "2",
    name: "Mediterranean Meal Plan",
    type: "nutrition",
    description: "Heart-healthy Mediterranean diet plan with balanced macros and delicious recipes.",
    duration: "8 weeks",
    difficulty: "Beginner",
    clientsAssigned: 12,
    rating: 4.9,
    createdAt: "2024-02-10",
    tags: ["Mediterranean", "Heart Health", "Weight Loss"],
  },
  {
    id: "3",
    name: "HIIT Fat Burner",
    type: "workout",
    description: "High-intensity interval training program designed for maximum fat loss.",
    duration: "6 weeks",
    difficulty: "Advanced",
    clientsAssigned: 5,
    rating: 4.7,
    createdAt: "2024-02-08",
    tags: ["HIIT", "Fat Loss", "Cardio"],
  },
  {
    id: "4",
    name: "Plant-Based Performance",
    type: "nutrition",
    description: "Complete plant-based nutrition plan optimized for athletic performance.",
    duration: "10 weeks",
    difficulty: "Intermediate",
    clientsAssigned: 6,
    rating: 4.6,
    createdAt: "2024-02-05",
    tags: ["Plant-Based", "Performance", "Vegan"],
  },
  {
    id: "5",
    name: "Beginner's Foundation",
    type: "workout",
    description: "Perfect starting point for fitness newcomers with progressive overload principles.",
    duration: "8 weeks",
    difficulty: "Beginner",
    clientsAssigned: 15,
    rating: 4.9,
    createdAt: "2024-02-01",
    tags: ["Beginner", "Foundation", "Progressive"],
  },
]

export function PlansOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPlans = mockPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    return matchesSearch && plan.type === activeTab
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plan Builder</h1>
          <p className="text-muted-foreground">Create and manage workout and nutrition plans for your clients</p>
        </div>
        <div className="flex gap-2">
          <Link href="/coach/plans/workout/new">
            <Button>
              <Dumbbell className="w-4 h-4 mr-2" />
              New Workout Plan
            </Button>
          </Link>
          <Link href="/coach/plans/nutrition/new">
            <Button variant="outline">
              <Apple className="w-4 h-4 mr-2" />
              New Nutrition Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Plans ({mockPlans.length})</TabsTrigger>
          <TabsTrigger value="workout">Workout ({mockPlans.filter((p) => p.type === "workout").length})</TabsTrigger>
          <TabsTrigger value="nutrition">
            Nutrition ({mockPlans.filter((p) => p.type === "nutrition").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Dumbbell className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Plans</p>
                    <p className="text-xl font-bold">{filteredPlans.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Users className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Clients</p>
                    <p className="text-xl font-bold">
                      {filteredPlans.reduce((sum, plan) => sum + plan.clientsAssigned, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-chart-1/10 rounded-lg">
                    <Star className="w-4 h-4 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                    <p className="text-xl font-bold">
                      {(filteredPlans.reduce((sum, plan) => sum + plan.rating, 0) / filteredPlans.length).toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-chart-3/10 rounded-lg">
                    <Clock className="w-4 h-4 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {plan.type === "workout" ? (
                        <Dumbbell className="w-5 h-5 text-primary" />
                      ) : (
                        <Apple className="w-5 h-5 text-accent-foreground" />
                      )}
                      <Badge variant="secondary" className={getDifficultyColor(plan.difficulty)}>
                        {plan.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{plan.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{plan.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{plan.clientsAssigned} clients</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {plan.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {plan.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{plan.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Edit Plan
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No plans found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Create your first plan to get started"}
              </p>
              <div className="flex gap-2 justify-center">
                <Link href="/coach/plans/workout/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workout Plan
                  </Button>
                </Link>
                <Link href="/coach/plans/nutrition/new">
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Nutrition Plan
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
