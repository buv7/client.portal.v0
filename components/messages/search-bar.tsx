"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, X, Filter, Calendar, Paperclip } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string, filters?: any) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({
    dateRange: "",
    attachmentType: "",
  })

  const handleSearch = () => {
    onSearch(query, filters)
  }

  const clearSearch = () => {
    setQuery("")
    setFilters({ dateRange: "", attachmentType: "" })
    onSearch("", {})
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search messages..."
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setFilters((prev) => ({ ...prev, dateRange: "today" }))}>
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters((prev) => ({ ...prev, dateRange: "week" }))}>
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters((prev) => ({ ...prev, attachmentType: "images" }))}>
            <Paperclip className="h-4 w-4 mr-2" />
            Images Only
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters((prev) => ({ ...prev, attachmentType: "files" }))}>
            <Paperclip className="h-4 w-4 mr-2" />
            Files Only
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
