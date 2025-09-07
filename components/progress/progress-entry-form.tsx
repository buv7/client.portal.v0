"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X } from "lucide-react"
import type { ProgressEntry } from "./progress-tracker"

interface ProgressEntryFormProps {
  onSave: (entry: Omit<ProgressEntry, "id">) => void
  onCancel: () => void
}

export function ProgressEntryForm({ onSave, onCancel }: ProgressEntryFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    measurements: {
      waist: "",
      chest: "",
      arms: "",
      thighs: "",
      hips: "",
    },
    photos: {
      front: "",
      side: "",
      back: "",
    },
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entry: Omit<ProgressEntry, "id"> = {
      date: new Date(formData.date),
      weight: formData.weight ? Number.parseFloat(formData.weight) : undefined,
      measurements: {
        waist: formData.measurements.waist ? Number.parseFloat(formData.measurements.waist) : undefined,
        chest: formData.measurements.chest ? Number.parseFloat(formData.measurements.chest) : undefined,
        arms: formData.measurements.arms ? Number.parseFloat(formData.measurements.arms) : undefined,
        thighs: formData.measurements.thighs ? Number.parseFloat(formData.measurements.thighs) : undefined,
        hips: formData.measurements.hips ? Number.parseFloat(formData.measurements.hips) : undefined,
      },
      photos: {
        front: formData.photos.front || undefined,
        side: formData.photos.side || undefined,
        back: formData.photos.back || undefined,
      },
      notes: formData.notes || undefined,
    }

    onSave(entry)
  }

  const handlePhotoUpload = (position: "front" | "side" | "back") => {
    // In a real app, this would open camera/gallery
    setFormData((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [position]: "/progress-photo.jpg",
      },
    }))
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add Progress Entry</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="Enter weight"
              value={formData.weight}
              onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
            />
          </div>

          {/* Measurements */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Body Measurements (inches)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="waist">Waist</Label>
                <Input
                  id="waist"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.measurements.waist}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, waist: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chest">Chest</Label>
                <Input
                  id="chest"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.measurements.chest}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, chest: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arms">Arms</Label>
                <Input
                  id="arms"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.measurements.arms}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, arms: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thighs">Thighs</Label>
                <Input
                  id="thighs"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.measurements.thighs}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, thighs: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="hips">Hips</Label>
                <Input
                  id="hips"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.measurements.hips}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, hips: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Progress Photos */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Progress Photos</Label>
            <div className="grid grid-cols-3 gap-4">
              {(["front", "side", "back"] as const).map((position) => (
                <div key={position} className="space-y-2">
                  <Label className="capitalize">{position}</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handlePhotoUpload(position)}
                    className="w-full h-24 flex-col gap-2"
                  >
                    {formData.photos[position] ? (
                      <img
                        src={formData.photos[position] || "/placeholder.svg"}
                        alt={`${position} view`}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <>
                        <Camera className="h-6 w-6" />
                        <span className="text-xs">Add Photo</span>
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="How are you feeling? Any observations?"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Entry
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
