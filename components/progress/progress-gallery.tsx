"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Camera } from "lucide-react"
import type { ProgressEntry } from "./progress-tracker"

interface ProgressGalleryProps {
  data: ProgressEntry[]
}

export function ProgressGallery({ data }: ProgressGalleryProps) {
  const [selectedEntry, setSelectedEntry] = useState<ProgressEntry | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparisonEntries, setComparisonEntries] = useState<[ProgressEntry?, ProgressEntry?]>([undefined, undefined])

  const entriesWithPhotos = data
    .filter((entry) => entry.photos.front || entry.photos.side || entry.photos.back)
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  const handleEntrySelect = (entry: ProgressEntry) => {
    if (comparisonMode) {
      if (!comparisonEntries[0]) {
        setComparisonEntries([entry, undefined])
      } else if (!comparisonEntries[1] && comparisonEntries[0].id !== entry.id) {
        setComparisonEntries([comparisonEntries[0], entry])
      } else {
        setComparisonEntries([entry, undefined])
      }
    } else {
      setSelectedEntry(entry)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (entriesWithPhotos.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No Progress Photos Yet</h3>
        <p className="text-muted-foreground mb-4">Start taking progress photos to track your transformation</p>
        <Button>Add First Photo</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Gallery Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={comparisonMode ? "default" : "outline"}
            onClick={() => {
              setComparisonMode(!comparisonMode)
              setComparisonEntries([undefined, undefined])
              setSelectedEntry(null)
            }}
          >
            {comparisonMode ? "Exit Comparison" : "Compare Photos"}
          </Button>
          {comparisonMode && <Badge variant="secondary">Select 2 entries to compare</Badge>}
        </div>
      </div>

      {/* Comparison View */}
      {comparisonMode && comparisonEntries[0] && comparisonEntries[1] && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Progress Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisonEntries.map((entry, index) => (
                <div key={entry?.id} className="space-y-4">
                  <div className="text-center">
                    <h4 className="font-medium">{formatDate(entry!.date)}</h4>
                    {entry!.weight && <p className="text-sm text-muted-foreground">{entry!.weight} lbs</p>}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["front", "side", "back"] as const).map((position) => (
                      <div key={position} className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                        {entry!.photos[position] ? (
                          <img
                            src={entry!.photos[position] || "/placeholder.svg"}
                            alt={`${position} view`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Camera className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <p className="text-xs text-center mt-1 capitalize">{position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entriesWithPhotos.map((entry) => (
          <Card
            key={entry.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              comparisonMode && comparisonEntries.some((e) => e?.id === entry.id) ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleEntrySelect(entry)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{formatDate(entry.date)}</span>
                {entry.weight && (
                  <Badge variant="secondary" className="ml-auto">
                    {entry.weight} lbs
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {(["front", "side", "back"] as const).map((position) => (
                  <div key={position} className="aspect-[3/4] bg-muted rounded overflow-hidden">
                    {entry.photos[position] ? (
                      <img
                        src={entry.photos[position] || "/placeholder.svg"}
                        alt={`${position} view`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {entry.notes && <p className="text-xs text-muted-foreground line-clamp-2">{entry.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Entry Modal */}
      {selectedEntry && !comparisonMode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{formatDate(selectedEntry.date)}</h3>
                <Button variant="ghost" onClick={() => setSelectedEntry(null)}>
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {(["front", "side", "back"] as const).map((position) => (
                  <div key={position} className="space-y-2">
                    <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                      {selectedEntry.photos[position] ? (
                        <img
                          src={selectedEntry.photos[position] || "/placeholder.svg"}
                          alt={`${position} view`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-center capitalize">{position}</p>
                  </div>
                ))}
              </div>

              {selectedEntry.weight && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{selectedEntry.weight} lbs</p>
                </div>
              )}

              {selectedEntry.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="text-sm">{selectedEntry.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
