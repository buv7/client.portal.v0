"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { MoreVertical, Pin, Reply } from "lucide-react"

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

interface MessageListProps {
  messages: Message[]
  onReaction: (messageId: string, reaction: string) => void
  onPin: (messageId: string) => void
}

export function MessageList({ messages, onReaction, onPin }: MessageListProps) {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const reactions = ["❤️", "👍", "😂", "😮", "😢", "😡"]

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex gap-3 group", message.sender === "user" ? "flex-row-reverse" : "flex-row")}
        >
          {message.sender === "coach" && (
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src="/coach-avatar.png" />
              <AvatarFallback className="bg-accent text-accent-foreground text-xs">JD</AvatarFallback>
            </Avatar>
          )}

          <div className={cn("flex flex-col max-w-[70%]", message.sender === "user" ? "items-end" : "items-start")}>
            {/* Message Bubble */}
            <div className="relative">
              {message.isPinned && (
                <Pin className="absolute -top-2 -right-2 h-4 w-4 text-primary bg-background rounded-full p-0.5" />
              )}

              <div
                className={cn(
                  "rounded-2xl px-4 py-2 max-w-full break-words",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-muted-foreground rounded-bl-md",
                )}
                onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>

                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        {attachment.type === "image" && (
                          <img
                            src={attachment.url || "/placeholder.svg"}
                            alt="Attachment"
                            className="max-w-full h-auto rounded-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reactions */}
              {message.reactions && message.reactions.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {message.reactions.map((reaction, index) => (
                    <span key={index} className="text-xs bg-background border border-border rounded-full px-2 py-0.5">
                      {reaction}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Timestamp and Actions */}
            <div
              className={cn(
                "flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
                message.sender === "user" ? "flex-row-reverse" : "flex-row",
              )}
            >
              <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>

              {selectedMessage === message.id && (
                <div className="flex items-center gap-1">
                  {/* Quick Reactions */}
                  <div className="flex gap-1">
                    {reactions.slice(0, 3).map((reaction) => (
                      <Button
                        key={reaction}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-xs hover:bg-accent"
                        onClick={() => onReaction(message.id, reaction)}
                      >
                        {reaction}
                      </Button>
                    ))}
                  </div>

                  {/* More Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log("Reply to", message.id)}>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onPin(message.id)}>
                        <Pin className="h-4 w-4 mr-2" />
                        {message.isPinned ? "Unpin" : "Pin"}
                      </DropdownMenuItem>
                      {reactions.map((reaction) => (
                        <DropdownMenuItem key={reaction} onClick={() => onReaction(message.id, reaction)}>
                          <span className="mr-2">{reaction}</span>
                          React
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
