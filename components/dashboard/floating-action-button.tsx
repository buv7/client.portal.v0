"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Dumbbell, UtensilsCrossed, Camera, FileText, Phone } from "lucide-react"
import { ScheduleCallModal } from "@/components/calls/schedule-call-modal"

// --- edge safety constants ---
const ACTION_SIZE = typeof window !== "undefined" && window.innerWidth >= 768 ? 64 : 56 // px (w/h of action button)
const EDGE_PAD = 12 // px gap from the screen edge
const MIN_CENTER_X = -(ACTION_SIZE / 2 + EDGE_PAD) // icon center must be <= this (negative = left of FAB)

// Minimum center-to-center clearance from FAB to any action:
// 64px FAB, 64px action → 32 + 32 + 16px gap = 80…88 feels safe.
const CLEARANCE_FROM_FAB = 88 // bump this up/down as needed
const EXTRA_RADIUS = 40 // global push away from FAB
const PER_ITEM_SPREAD = 8 // small extra per item to avoid crowding

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false)

  const OFFSETS = {
    "Schedule Call": { dx: 12, dy: 12 }, // right + down x1.5
    "Add Progress Photo": { dx: -8, dy: 0 }, // slightly left
    "Add Meal": { dx: -8, dy: -8 }, // left & up
    "Add Note": { dx: 0, dy: 8 }, // down
  }

  const quickActions = useMemo(
    () => [
      { icon: Dumbbell, label: "Add Workout", href: "/workouts/add" },
      { icon: UtensilsCrossed, label: "Add Meal", href: "/nutrition/add" },
      { icon: Camera, label: "Add Progress Photo", href: "/progress/photo" },
      { icon: FileText, label: "Add Note", href: "/notes/add" },
      { icon: Phone, label: "Schedule Call", action: "schedule-call" },
    ],
    [],
  )

  const handleActionClick = (action: any) => {
    if (action.action === "schedule-call") {
      setIsOpen(false)
      setIsScheduleCallOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="fixed bottom-24 right-6 md:bottom-6 z-50">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
        )}

        <div className="relative z-50">
          <div
            className={`absolute bottom-0 right-0 origin-bottom-right transition-all duration-300 ${
              isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon

              const n = quickActions.length
              const startDeg = 270 // up from FAB
              const endDeg = 180 // left from FAB
              const stepDeg = n > 1 ? (endDeg - startDeg) / (n - 1) : 0

              // compute how far to auto-shift the whole arc so the rightmost icon is inside
              const startRad = (startDeg * Math.PI) / 180
              const rightmostRadius = CLEARANCE_FROM_FAB + EXTRA_RADIUS // index 0 (rightmost)
              const rightmostX = Math.cos(startRad) * rightmostRadius // before bias (likely ~0)
              const AUTO_BIAS_X = Math.min(0, MIN_CENTER_X - rightmostX) // negative shift to keep inside
              const BIAS_Y = -40 // global upward shift to move all buttons higher

              const angleDeg = startDeg + index * stepDeg
              const angleRad = (angleDeg * Math.PI) / 180

              // final radius = hard clearance + extra push + per-item spread
              const radius = CLEARANCE_FROM_FAB + EXTRA_RADIUS + index * PER_ITEM_SPREAD

              // positions on the arc with auto-clamped left positioning
              const x = Math.cos(angleRad) * radius + AUTO_BIAS_X
              const y = Math.sin(angleRad) * radius + BIAS_Y

              const adj = OFFSETS[action.label] || { dx: 0, dy: 0 }
              const finalX = x + adj.dx
              const finalY = y + adj.dy

              return (
                <div
                  key={action.href || `qa-${index}`}
                  className="absolute will-change-transform"
                  style={{
                    transform: `translate(${finalX}px, ${finalY}px)`,
                    transition: "transform 300ms ease, opacity 300ms ease",
                    transitionDelay: `${index * 60}ms`,
                  }}
                >
                  <Button
                    size="icon"
                    className="rounded-full w-14 h-14 md:w-16 md:h-16 p-0 bg-background/85 backdrop-blur-md border-2 border-primary/30 hover:border-primary hover:bg-primary/15 shadow-xl group relative"
                    onClick={() => handleActionClick(action)}
                  >
                    <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary relative z-10 group-hover:text-white transition-colors duration-200" />
                    <div className="absolute right-full top-1/2 -translate-y-1/2 bg-card backdrop-blur-sm text-xs px-3 py-1.5 rounded-md border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-card-foreground mr-2 shadow-lg">
                      {action.label}
                    </div>
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Main FAB */}
          <Button
            size="lg"
            aria-label="Quick add"
            className="rounded-full w-16 h-16 shadow-xl bg-primary/90 backdrop-blur-md border-2 border-primary/50 hover:bg-primary hover:border-primary transition-all duration-300 relative z-10"
            onClick={() => setIsOpen((v) => !v)}
          >
            <Plus className={`h-7 w-7 transition-transform duration-300 text-white ${isOpen ? "rotate-45" : ""}`} />
          </Button>
        </div>
      </div>

      <ScheduleCallModal isOpen={isScheduleCallOpen} onClose={() => setIsScheduleCallOpen(false)} />
    </>
  )
}
