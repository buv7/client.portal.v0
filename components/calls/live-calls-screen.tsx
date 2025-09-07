"use client"

import { useState } from "react"
import { RefreshCw, Phone, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScheduleCallModal } from "./schedule-call-modal"

export function LiveCallsScreen() {
  const [activeTab, setActiveTab] = useState("scheduled")
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const tabs = [
    { id: "scheduled", label: "Scheduled" },
    { id: "active", label: "Active" },
    { id: "recent", label: "Recent" },
  ]

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Live Calls</h1>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex mt-4 border-b border-primary-foreground/20">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-1 text-primary-foreground border-b-2 rounded-none ${
                activeTab === tab.id ? "border-primary-foreground" : "border-transparent"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === "scheduled" && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Scheduled Calls</h3>
            <p className="text-muted-foreground">Tap the + button to schedule a new call</p>
          </div>
        )}

        {activeTab === "active" && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Active Calls</h3>
            <p className="text-muted-foreground">Active calls will appear here</p>
          </div>
        )}

        {activeTab === "recent" && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Recent Calls</h3>
            <p className="text-muted-foreground">Recent calls will appear here</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 md:bottom-4">
        <Button size="lg" className="rounded-full w-14 h-14 shadow-lg" onClick={() => setIsScheduleModalOpen(true)}>
          <Phone className="h-6 w-6" />
          <Plus className="h-4 w-4 -ml-1" />
        </Button>
      </div>

      {/* Schedule Call Modal */}
      <ScheduleCallModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} />
    </div>
  )
}
