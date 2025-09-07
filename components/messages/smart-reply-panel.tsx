"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SmartReplyPanelProps {
  onSelectReply: (reply: string) => void
  onDismiss: () => void
}

const smartReplies = [
  "Thanks for the feedback!",
  "Sounds good to me 👍",
  "I'll work on that",
  "When should we schedule this?",
  "Perfect timing!",
  "Got it, thanks!",
]

export function SmartReplyPanel({ onSelectReply, onDismiss }: SmartReplyPanelProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onDismiss()
    }, 15000) // Auto-hide after 15 seconds

    return () => clearTimeout(timer)
  }, [onDismiss])

  if (!isVisible) return null

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">Smart Replies</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsVisible(false)
            onDismiss()
          }}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {smartReplies.map((reply, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelectReply(reply)}
            className="rounded-full text-xs bg-muted hover:bg-accent"
          >
            {reply}
          </Button>
        ))}
      </div>
    </div>
  )
}
