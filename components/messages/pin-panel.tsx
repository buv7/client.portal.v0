"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pin, X } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "coach"
  timestamp: Date
  type: "text" | "voice" | "image" | "file"
  reactions?: string[]
  isPinned?: boolean
  replyTo?: string
  attachments?: any[]
  isRead?: boolean
}

interface PinPanelProps {
  messages: Message[]
  onUnpin: (messageId: string) => void
}

export function PinPanel({ messages, onUnpin }: PinPanelProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Pin className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Pinned Messages</h3>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Pin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No pinned messages yet</p>
          <p className="text-sm">Pin important messages to find them easily</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="border border-border rounded-lg p-3 bg-card">
              <div className="flex items-start gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={
                      message.sender === "coach"
                        ? "/placeholder.svg?height=24&width=24&query=coach avatar"
                        : "/placeholder.svg?height=24&width=24&query=user avatar"
                    }
                  />
                  <AvatarFallback className="text-xs">{message.sender === "coach" ? "JD" : "ME"}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-3">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(message.timestamp)}</p>
                </div>

                <Button variant="ghost" size="icon" onClick={() => onUnpin(message.id)} className="h-6 w-6 shrink-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
