"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MessageList } from "./message-list"
import { MessageComposer } from "./message-composer"
import { SearchBar } from "./search-bar"
import { PinPanel } from "./pin-panel"
import { SmartReplyPanel } from "./smart-reply-panel"
import { ScheduleCallModal } from "@/components/calls/schedule-call-modal"
import { Search, Pin, Phone, Video } from "lucide-react"

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

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Great job on today's workout! Your form on the squats was perfect. Keep up the excellent work!",
    sender: "coach",
    timestamp: new Date(Date.now() - 3600000),
    type: "text",
    isRead: true,
    reactions: ["💪", "🔥"],
  },
  {
    id: "2",
    content: "Thank you! I felt really strong today. Should I increase the weight next session?",
    sender: "user",
    timestamp: new Date(Date.now() - 3000000),
    type: "text",
    isRead: true,
  },
  {
    id: "3",
    content: "Yes, let's bump up the weight by 5lbs. Your progression has been fantastic this month.",
    sender: "coach",
    timestamp: new Date(Date.now() - 1800000),
    type: "text",
    isRead: true,
    isPinned: true,
  },
  {
    id: "4",
    content: "Perfect! Also, I took some progress photos today. The difference is amazing!",
    sender: "user",
    timestamp: new Date(Date.now() - 900000),
    type: "text",
    isRead: true,
    attachments: [{ type: "image", url: "/progress-photo.jpg" }],
  },
]

export function MessengerScreen() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSmartReplies, setShowSmartReplies] = useState(true)
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content: string, type: "text" | "voice" | "image" | "file" = "text") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type,
      isRead: false,
    }
    setMessages((prev) => [...prev, newMessage])
    setShowSmartReplies(false)

    // Simulate coach typing
    setTimeout(() => setIsTyping(true), 1000)
    setTimeout(() => {
      setIsTyping(false)
      setShowSmartReplies(true)
    }, 3000)
  }

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, reactions: [...(msg.reactions || []), reaction] } : msg)),
    )
  }

  const handlePin = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg)))
  }

  const pinnedMessages = messages.filter((msg) => msg.isPinned)

  return (
    <>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/coach-avatar.png" />
              <AvatarFallback className="bg-accent text-accent-foreground">JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-foreground">Coach Jordan</h2>
              {isTyping && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span>typing...</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsScheduleCallOpen(true)}
              className="text-muted-foreground hover:text-foreground"
              title="Schedule Call"
            >
              <Phone className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              title="Start Video Call"
            >
              <Video className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Pin className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <PinPanel messages={pinnedMessages} onUnpin={handlePin} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="p-4 border-b border-border bg-card">
            <SearchBar onSearch={(query) => console.log("Search:", query)} />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <MessageList messages={messages} onReaction={handleReaction} onPin={handlePin} />
          <div ref={messagesEndRef} />
        </div>

        {/* Smart Replies */}
        {showSmartReplies && (
          <SmartReplyPanel onSelectReply={handleSendMessage} onDismiss={() => setShowSmartReplies(false)} />
        )}

        {/* Message Composer */}
        <div className="border-t border-border bg-card">
          <MessageComposer onSendMessage={handleSendMessage} />
        </div>
      </div>

      <ScheduleCallModal isOpen={isScheduleCallOpen} onClose={() => setIsScheduleCallOpen(false)} />
    </>
  )
}
