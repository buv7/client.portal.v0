"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Reply, Edit, Trash, Pin } from "lucide-react"

interface MessageActionsProps {
  messageId: string
  isPinned?: boolean
  onReply: (messageId: string) => void
  onEdit: (messageId: string) => void
  onDelete: (messageId: string) => void
  onPin: (messageId: string) => void
  onReaction: (messageId: string, reaction: string) => void
}

export function MessageActions({
  messageId,
  isPinned,
  onReply,
  onEdit,
  onDelete,
  onPin,
  onReaction,
}: MessageActionsProps) {
  const reactions = ["❤️", "👍", "😂", "😮", "😢", "😡"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreVertical className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onReply(messageId)}>
          <Reply className="h-4 w-4 mr-2" />
          Reply
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(messageId)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPin(messageId)}>
          <Pin className="h-4 w-4 mr-2" />
          {isPinned ? "Unpin" : "Pin"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(messageId)} className="text-destructive">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>

        {/* Reaction submenu */}
        {reactions.map((reaction) => (
          <DropdownMenuItem key={reaction} onClick={() => onReaction(messageId, reaction)}>
            <span className="mr-2">{reaction}</span>
            React
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
