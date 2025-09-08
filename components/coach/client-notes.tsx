"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FileText, Plus, Search, Tag, Trash2 } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  date: string
  type: "general" | "progress" | "concern" | "achievement"
}

interface ClientNotesProps {
  clientId: string
}

export function ClientNotes({ clientId }: ClientNotesProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Great progress on bench press",
      content:
        "Mike has shown excellent form improvement and increased his bench press by 15 lbs this month. His consistency with the program is paying off.",
      tags: ["progress", "strength", "bench-press"],
      date: "2024-03-15",
      type: "achievement",
    },
    {
      id: "2",
      title: "Nutrition concerns",
      content:
        "Client mentioned struggling with late-night snacking. Discussed strategies for meal prep and portion control. Need to follow up next week.",
      tags: ["nutrition", "habits", "follow-up"],
      date: "2024-03-10",
      type: "concern",
    },
    {
      id: "3",
      title: "Form check - deadlifts",
      content:
        "Worked on deadlift technique today. Client tends to round back slightly at heavier weights. Recommended deload and focus on form.",
      tags: ["form", "deadlift", "technique"],
      date: "2024-03-08",
      type: "general",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: "",
    type: "general" as Note["type"],
  })

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)))

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => note.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        date: new Date().toISOString().split("T")[0],
        type: newNote.type,
      }
      setNotes([note, ...notes])
      setNewNote({ title: "", content: "", tags: "", type: "general" })
      setIsAddingNote(false)
    }
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const getTypeColor = (type: Note["type"]) => {
    switch (type) {
      case "achievement":
        return "bg-primary text-primary-foreground"
      case "concern":
        return "bg-destructive text-destructive-foreground"
      case "progress":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Client Notes</span>
              <Badge variant="secondary">{notes.length}</Badge>
            </CardTitle>
            <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Note</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Note title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      placeholder="Note content..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={newNote.tags}
                      onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                      placeholder="progress, strength, nutrition..."
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddNote}>Add Note</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{note.title}</h3>
                  <Badge className={getTypeColor(note.type)}>{note.type}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{note.date}</span>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteNote(note.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm mb-3">{note.content}</p>
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
