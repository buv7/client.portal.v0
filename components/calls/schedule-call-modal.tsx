"use client"

import { useState } from "react"
import { X, Clock, Phone, Video, Users, User, Calendar, Clock3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface ScheduleCallModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ScheduleCallModal({ isOpen, onClose }: ScheduleCallModalProps) {
  const [selectedCallType, setSelectedCallType] = useState("video")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("7/9/2025")
  const [time, setTime] = useState("8:33 PM")
  const [maxParticipants, setMaxParticipants] = useState(1)
  const [recordingEnabled, setRecordingEnabled] = useState(false)

  const callTypes = [
    {
      id: "audio",
      label: "Audio Call",
      description: "Voice-only call",
      icon: Phone,
    },
    {
      id: "video",
      label: "Video Call",
      description: "Video call with camera",
      icon: Video,
    },
    {
      id: "group",
      label: "Group Call",
      description: "Multi-participant call",
      icon: Users,
    },
    {
      id: "coaching",
      label: "Coaching Session",
      description: "Health coaching session",
      icon: User,
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Schedule Call</h2>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Call Type Selection */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">Call Type</Label>
            <div className="space-y-2">
              {callTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`p-3 cursor-pointer transition-colors ${
                      selectedCallType === type.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedCallType(type.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 ${
                            selectedCallType === type.id ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <div>
                          <div
                            className={`font-medium ${
                              selectedCallType === type.id ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {type.label}
                          </div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </div>
                      {selectedCallType === type.id && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">Title</Label>
            <Input placeholder="Enter call title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">Description</Label>
            <Textarea
              placeholder="Enter call description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Schedule */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">Schedule</Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={date} onChange={(e) => setDate(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Clock3 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={time} onChange={(e) => setTime(e.target.value)} className="pl-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Max Participants */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">Max Participants</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <Button
                  key={num}
                  variant={maxParticipants === num ? "default" : "outline"}
                  size="sm"
                  className="w-10 h-10 rounded-full p-0"
                  onClick={() => setMaxParticipants(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          {/* Recording */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">Recording</Label>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Enable recording</div>
                <div className="text-sm text-muted-foreground">This call will be recorded</div>
              </div>
              <Switch checked={recordingEnabled} onCheckedChange={setRecordingEnabled} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1">Schedule</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
