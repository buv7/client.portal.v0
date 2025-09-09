"use client"

import type React from "react"

import { useState } from "react"
import { CoachBottomNavigation } from "./coach-bottom-navigation"
import { CoachSideMenu } from "./coach-side-menu"

interface CoachLayoutProps {
  children: React.ReactNode
}

export function CoachLayout({ children }: CoachLayoutProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Side Menu */}
      <CoachSideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />

      {/* Main Content */}
      <div className="pb-16 md:pb-0">
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>

      {/* Bottom Navigation */}
      <CoachBottomNavigation onMenuClick={() => setIsSideMenuOpen(true)} />
    </div>
  )
}
