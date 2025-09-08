"use client"

import { useState } from "react"
import Image from "next/image"
import { Settings, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CoachDashboardHeader() {
  const [notifications] = useState(3) // Mock notification count

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/vagus-logo-white.png"
                alt="Coach Avatar"
                width={60}
                height={60}
                className="rounded-full object-cover bg-card"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-card"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Coach Sarah</h1>
              <p className="text-muted-foreground">Ready to help your clients achieve their goals?</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  Pro Coach
                </Badge>
                <Badge variant="outline">12 Day Streak</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
