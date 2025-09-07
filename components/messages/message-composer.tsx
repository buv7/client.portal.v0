"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AttachmentPicker } from "./attachment-picker"
import { VoiceRecorder } from "./voice-recorder"
import { Paperclip, Mic, Send, Smile } from "lucide-react"

interface MessageComposerProps {
  onSendMessage: (content: string, type?: "text" | "voice" | "image" | "file") => void
}

export function MessageComposer({ onSendMessage }: MessageComposerProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleAttachment = (type: "image" | "file", content: string) => {
    onSendMessage(content, type)
  }

  const handleVoiceMessage = (audioBlob: Blob) => {
    // In a real app, you'd upload the audio and get a URL
    onSendMessage("Voice message", "voice")
  }

  return (
    <div className="p-4">
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <AttachmentPicker onAttachment={handleAttachment} />
          </SheetContent>
        </Sheet>

        {/* Voice Recorder */}
        {isRecording ? (
          <div className="flex-1">
            <VoiceRecorder onSend={handleVoiceMessage} onCancel={() => setIsRecording(false)} />
          </div>
        ) : (
          <>
            {/* Text Input */}
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="pr-10 bg-muted border-0 rounded-full"
              />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>

            {/* Send/Voice Button */}
            {message.trim() ? (
              <Button onClick={handleSend} size="icon" className="shrink-0 rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="shrink-0" onMouseDown={() => setIsRecording(true)}>
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
