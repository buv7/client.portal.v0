"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Eye, Trash2 } from "lucide-react"
import Image from "next/image"

interface ProgressPhotoManagerProps {
  clientId: string
}

export function ProgressPhotoManager({ clientId }: ProgressPhotoManagerProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "comparison">("grid")

  // Mock photo data - replace with actual API call
  const photos = [
    {
      id: "1",
      date: "2024-01-15",
      type: "front",
      url: "/progress-photo-front.jpg",
      week: 1,
    },
    {
      id: "2",
      date: "2024-01-15",
      type: "side",
      url: "/progress-photo-side.jpg",
      week: 1,
    },
    {
      id: "3",
      date: "2024-01-22",
      type: "front",
      url: "/progress-photo-front-week-2.jpg",
      week: 2,
    },
    {
      id: "4",
      date: "2024-01-22",
      type: "side",
      url: "/progress-photo-side-week-2.jpg",
      week: 2,
    },
    {
      id: "5",
      date: "2024-02-26",
      type: "front",
      url: "/progress-photo-front-week-6.jpg",
      week: 6,
    },
    {
      id: "6",
      date: "2024-02-26",
      type: "side",
      url: "/progress-photo-side-week-6.jpg",
      week: 6,
    },
  ]

  const groupedPhotos = photos.reduce(
    (acc, photo) => {
      const week = `Week ${photo.week}`
      if (!acc[week]) acc[week] = []
      acc[week].push(photo)
      return acc
    },
    {} as Record<string, typeof photos>,
  )

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            Grid View
          </Button>
          <Button
            variant={viewMode === "comparison" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("comparison")}
          >
            Comparison
          </Button>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
          <Button size="sm">
            <Camera className="h-4 w-4 mr-2" />
            Request Photos
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* Grid View */
        <div className="space-y-6">
          {Object.entries(groupedPhotos).map(([week, weekPhotos]) => (
            <Card key={week}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{week}</CardTitle>
                  <Badge variant="outline">{new Date(weekPhotos[0].date).toLocaleDateString()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weekPhotos.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden border">
                        <Image
                          src={photo.url || "/placeholder.svg"}
                          alt={`${photo.type} view - ${week}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" onClick={() => setSelectedPhoto(photo.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-center capitalize">{photo.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Comparison View */
        <Card>
          <CardHeader>
            <CardTitle>Progress Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Week 1 (Start)</h3>
                  <p className="text-sm text-muted-foreground">January 15, 2024</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {groupedPhotos["Week 1"]?.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden border">
                        <Image
                          src={photo.url || "/placeholder.svg"}
                          alt={`${photo.type} view - Week 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-center capitalize">{photo.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Week 6 (Current)</h3>
                  <p className="text-sm text-muted-foreground">February 26, 2024</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {groupedPhotos["Week 6"]?.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden border">
                        <Image
                          src={photo.url || "/placeholder.svg"}
                          alt={`${photo.type} view - Week 6`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-center capitalize">{photo.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="mt-8 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">Progress Summary (6 weeks)</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Weight Loss</p>
                  <p className="font-medium">-15.2 lbs</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Body Fat</p>
                  <p className="font-medium">-5.7%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Muscle Gain</p>
                  <p className="font-medium">+2.1 lbs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
