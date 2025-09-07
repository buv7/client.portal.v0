"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Plus, Dumbbell, UtensilsCrossed, Camera, FileText } from "lucide-react"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions = [
    { icon: Dumbbell, label: "Add Workout", href: "/workouts/add" },
    { icon: UtensilsCrossed, label: "Add Meal", href: "/nutrition/add" },
    { icon: Camera, label: "Add Progress Photo", href: "/progress/photo" },
    { icon: FileText, label: "Add Note", href: "/notes/add" },
  ]

  return (
    <div className="fixed bottom-24 right-6 md:bottom-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto">
          <SheetHeader>
            <SheetTitle>Quick Add</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.href}
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
