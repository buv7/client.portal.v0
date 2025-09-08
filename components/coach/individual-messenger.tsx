"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  Calendar,
  Brain,
  Search,
  Pin,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  ImageIcon,
  File,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

interface Message {
  id: string
  senderId: string
  senderType: "coach" | "client"
  content: string
  timestamp: string
  type: "text" | "image" | "file" | "voice" | "system"
  attachments?: Attachment[]
  isPinned?: boolean
}

interface Attachment {
  id: string
  name: string
  type: "image" | "file" | "voice"
  url: string
  size?: number
}

interface IndividualMessengerProps {
  clientId: string
}

export function IndividualMessenger({ clientId }: IndividualMessengerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      senderType: "client",
      content: "Hi Coach! I just finished today's workout. It was challenging but I feel great!",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: "coach",
      senderType: "coach",
      content: "That's fantastic, Mike! How did the bench press feel? Were you able to hit the target reps?",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: "3",
      senderId: "1",
      senderType: "client",
      content: "Yes! I managed to get all 3 sets of 8 reps at 185 lbs. Felt much stronger than last week.",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: "4",
      senderId: "coach",
      senderType: "coach",
      content:
        "Excellent progress! That's a 10 lb increase from last week. Let's schedule a form check session to make sure your technique is solid as we increase the weight.",
      timestamp: "10:37 AM",
      type: "text",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showSmartReplies, setShowSmartReplies] = useState(true)
  const [showQuickBook, setShowQuickBook] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock client data
  const client = {
    id: clientId,
    name: "Mike Johnson",
    avatar: "/vagus-logo-white.png",
    isOnline: true,
    lastSeen: "2 min ago",
  }

  const smartReplies = [
    "Great job! Keep up the excellent work 💪",
    "Let's schedule a check-in session to review your progress",
    "I'll adjust your plan based on this feedback",
    "That's exactly what we want to see! Well done",
    "Can you send me a form video for the next session?",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: "coach",
        senderType: "coach",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")
      setShowSmartReplies(false)
    }
  }

  const sendSmartReply = (reply: string) => {
    const message: Message = {
      id: Date.now().toString(),
      senderId: "coach",
      senderType: "coach",
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    }
    setMessages([...messages, message])
    setShowSmartReplies(false)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Implement voice recording logic
  }

  const handleAttachment = (type: "image" | "file") => {
    console.log(`Attaching ${type}`)
    // Implement file attachment logic
  }

  const pinMessage = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg)))
  }

  const filteredMessages = searchTerm
    ? messages.filter((msg) => msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
    : messages

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/coach/messages">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="relative">
                <Image
                  src={client.avatar || "/placeholder.svg"}
                  alt={client.name}
                  width={40}
                  height={40}
                  className="rounded-full bg-muted"
                />
                {client.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {client.isOnline ? "Online" : `Last seen ${client.lastSeen}`}
                  {isTyping && " • typing..."}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Search Messages</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Search in conversation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {filteredMessages.map((msg) => (
                        <div key={msg.id} className="p-2 bg-muted/30 rounded text-sm">
                          <p className="font-medium">{msg.senderType === "coach" ? "You" : client.name}</p>
                          <p>{msg.content}</p>
                          <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Client Profile</DropdownMenuItem>
                  <DropdownMenuItem>Pinned Messages</DropdownMenuItem>
                  <DropdownMenuItem>Export Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.senderType === "coach" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${
                message.senderType === "coach" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {message.isPinned && <Pin className="absolute -top-2 -right-2 h-4 w-4 text-accent" />}
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs opacity-70">{message.timestamp}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                  onClick={() => pinMessage(message.id)}
                >
                  <Pin className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Smart Replies */}
      {showSmartReplies && (
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Smart Replies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {smartReplies.map((reply, index) => (
              <Button key={index} variant="outline" size="sm" onClick={() => sendSmartReply(reply)} className="text-xs">
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Book Panel */}
      <Dialog open={showQuickBook} onOpenChange={setShowQuickBook}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Session with {client.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="sessionType">Session Type</Label>
              <Input id="sessionType" placeholder="e.g., Form Check, Progress Review" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" defaultValue="60" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Gym, Virtual, etc." />
            </div>
            <Button className="w-full">Schedule Session</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="resize-none"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
            />
          </div>
          <div className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleAttachment("image")}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAttachment("file")}>
                  <File className="h-4 w-4 mr-2" />
                  File
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRecording}
              className={isRecording ? "text-destructive" : ""}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowQuickBook(true)}>
              <Calendar className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
