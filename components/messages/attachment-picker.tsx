"use client"

import { Button } from "@/components/ui/button"
import { Camera, ImageIcon, FileText, Mic } from "lucide-react"

interface AttachmentPickerProps {
  onAttachment: (type: "image" | "file", content: string) => void
}

export function AttachmentPicker({ onAttachment }: AttachmentPickerProps) {
  const handleCamera = () => {
    // In a real app, this would open the camera
    onAttachment("image", "Camera photo taken")
  }

  const handleGallery = () => {
    // In a real app, this would open the gallery
    onAttachment("image", "Image from gallery")
  }

  const handleFile = () => {
    // In a real app, this would open file picker
    onAttachment("file", "File attached")
  }

  return (
    <div className="p-6">
      <h3 className="font-semibold mb-4">Add Attachment</h3>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleCamera} className="h-20 flex-col gap-2 bg-transparent">
          <Camera className="h-6 w-6" />
          <span className="text-sm">Camera</span>
        </Button>

        <Button variant="outline" onClick={handleGallery} className="h-20 flex-col gap-2 bg-transparent">
          <ImageIcon className="h-6 w-6" />
          <span className="text-sm">Gallery</span>
        </Button>

        <Button variant="outline" onClick={handleFile} className="h-20 flex-col gap-2 bg-transparent">
          <FileText className="h-6 w-6" />
          <span className="text-sm">File</span>
        </Button>

        <Button variant="outline" onClick={() => console.log("Voice recorder")} className="h-20 flex-col gap-2">
          <Mic className="h-6 w-6" />
          <span className="text-sm">Voice</span>
        </Button>
      </div>
    </div>
  )
}
