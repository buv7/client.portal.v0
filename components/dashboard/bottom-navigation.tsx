"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Dumbbell, Calendar, UtensilsCrossed, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("home")

  const tabs = [
    { id: "home", label: "Home", icon: Home, href: "/dashboard" },
    { id: "workouts", label: "Workouts", icon: Dumbbell, href: "/workouts" },
    { id: "calendar", label: "Calendar", icon: Calendar, href: "/calendar" },
    { id: "nutrition", label: "Nutrition", icon: UtensilsCrossed, href: "/nutrition" },
    { id: "messages", label: "Messages", icon: MessageCircle, href: "/messages" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Link key={tab.id} href={tab.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
