"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, Phone, Video, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

interface Thread {
  id: string
  clientId: string
  clientName: string
  clientAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isTyping: boolean
  isOnline: boolean
  lastMessageSender: "coach" | "client"
}

export function CoachThreadsScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [threads] = useState<Thread[]>([
    {
      id: "1",
      clientId: "1",
      clientName: "Mike Johnson",
      clientAvatar: "/vagus-logo-white.png",
      lastMessage: "Thanks for the workout plan! I'm excited to start tomorrow.",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      isTyping: false,
      isOnline: true,
      lastMessageSender: "client",
    },
    {
      id: "2",
      clientId: "2",
      clientName: "Sarah Chen",
      clientAvatar: "/vagus-logo-white.png",
      lastMessage: "Can we reschedule tomorrow's session?",
      lastMessageTime: "15 min ago",
      unreadCount: 1,
      isTyping: true,
      isOnline: true,
      lastMessageSender: "client",
    },
    {
      id: "3",
      clientId: "3",
      clientName: "David Rodriguez",
      clientAvatar: "/vagus-logo-white.png",
      lastMessage: "Perfect! See you at 3 PM.",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isTyping: false,
      isOnline: false,
      lastMessageSender: "coach",
    },
    {
      id: "4",
      clientId: "4",
      clientName: "Emma Wilson",
      clientAvatar: "/vagus-logo-white.png",
      lastMessage: "I have a question about the nutrition plan...",
      lastMessageTime: "3 hours ago",
      unreadCount: 3,
      isTyping: false,
      isOnline: true,
      lastMessageSender: "client",
    },
  ])

  const filteredThreads = threads.filter(
    (thread) =>
      thread.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalUnread = threads.reduce((sum, thread) => sum + thread.unreadCount, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Client Messages</span>
              {totalUnread > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {totalUnread}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto">
        {filteredThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "No client conversations yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredThreads.map((thread) => (
              <Link key={thread.id} href={`/coach/messages/${thread.clientId}`}>
                <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Image
                        src={thread.clientAvatar || "/placeholder.svg"}
                        alt={thread.clientName}
                        width={48}
                        height={48}
                        className="rounded-full bg-muted"
                      />
                      {thread.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold truncate">{thread.clientName}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{thread.lastMessageTime}</span>
                          {thread.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="rounded-full text-xs h-5 w-5 p-0 flex items-center justify-center"
                            >
                              {thread.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {thread.isTyping ? (
                            <div className="flex items-center space-x-1 text-primary">
                              <div className="flex space-x-1">
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
                              <span className="text-sm">typing...</span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground truncate">
                              {thread.lastMessageSender === "coach" && "You: "}
                              {thread.lastMessage}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-1 ml-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Video className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                              <DropdownMenuItem>Pin Conversation</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
