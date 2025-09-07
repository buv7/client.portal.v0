"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressEntryForm } from "./progress-entry-form"
import { ProgressGallery } from "./progress-gallery"
import { ProgressCalendar } from "./progress-calendar"
import { ProgressStats } from "./progress-stats"
import { ExportProgress } from "./export-progress"
import { Plus, TrendingUp, Calendar, Camera, Download } from "lucide-react"

export interface ProgressEntry {
  id: string
  date: Date
  weight?: number
  measurements: {
    waist?: number
    chest?: number
    arms?: number
    thighs?: number
    hips?: number
  }
  photos: {
    front?: string
    side?: string
    back?: string
  }
  notes?: string
}

const mockProgressData: ProgressEntry[] = [
  {
    id: "1",
    date: new Date("2024-01-01"),
    weight: 180,
    measurements: { waist: 34, chest: 42, arms: 15, thighs: 24, hips: 38 },
    photos: { front: "/progress-photo.jpg", side: "/progress-photo.jpg" },
    notes: "Starting my fitness journey!",
  },
  {
    id: "2",
    date: new Date("2024-01-15"),
    weight: 178,
    measurements: { waist: 33.5, chest: 42.5, arms: 15.2, thighs: 24.2, hips: 37.5 },
    photos: { front: "/progress-photo.jpg", side: "/progress-photo.jpg" },
    notes: "Feeling stronger already",
  },
  {
    id: "3",
    date: new Date("2024-02-01"),
    weight: 175,
    measurements: { waist: 33, chest: 43, arms: 15.5, thighs: 24.5, hips: 37 },
    photos: { front: "/progress-photo.jpg", side: "/progress-photo.jpg" },
    notes: "Great progress this month!",
  },
]

export function ProgressTracker() {
  const [progressData, setProgressData] = useState<ProgressEntry[]>(mockProgressData)
  const [showEntryForm, setShowEntryForm] = useState(false)

  const handleAddEntry = (entry: Omit<ProgressEntry, "id">) => {
    const newEntry: ProgressEntry = {
      ...entry,
      id: Date.now().toString(),
    }
    setProgressData((prev) => [...prev, newEntry])
    setShowEntryForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Progress Tracking</h1>
            <p className="text-muted-foreground">Monitor your fitness journey</p>
          </div>
          <Button onClick={() => setShowEntryForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Progress Entry Form Modal */}
      {showEntryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <ProgressEntryForm onSave={handleAddEntry} onCancel={() => setShowEntryForm(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Camera className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-6">
            <ProgressStats data={progressData} />
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <ProgressGallery data={progressData} />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <ProgressCalendar data={progressData} />
          </TabsContent>

          <TabsContent value="export" className="mt-6">
            <ExportProgress data={progressData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
