"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock } from "lucide-react"

interface SupplementQuickActionsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAction: (action: string) => void
}

export function SupplementQuickActions({ open, onOpenChange, onAction }: SupplementQuickActionsProps) {
  const snoozeOptions = [
    { label: "5 minutes", value: "5min" },
    { label: "15 minutes", value: "15min" },
    { label: "30 minutes", value: "30min" },
    { label: "1 hour", value: "1hour" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Snooze Supplement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">How long would you like to snooze this supplement reminder?</p>

          <div className="grid grid-cols-2 gap-3">
            {snoozeOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="bg-transparent"
                onClick={() => onAction(`snooze-${option.value}`)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
