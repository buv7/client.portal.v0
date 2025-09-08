"use client"

import type React from "react"

import { useState } from "react"
import { CoachBottomNavigation } from "./coach-bottom-navigation"
import { CoachSideMenu } from "./coach-side-menu"

interface CoachDashboardLayoutProps {
  children: React.ReactNode
}

export function CoachDashboardLayout({ children }: CoachDashboardLayoutProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Side Menu */}
      <CoachSideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />

      {/* Main Content */}
      <div className="pb-16 md:pb-0">{children}</div>

      {/* Bottom Navigation */}
      <CoachBottomNavigation onMenuClick={() => setIsSideMenuOpen(true)} />
    </div>
  )
}
