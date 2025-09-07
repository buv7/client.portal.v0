"use client"

import type React from "react"

import { useState } from "react"
import { BottomNavigation } from "./bottom-navigation"
import { SideMenu } from "./side-menu"
import { FloatingActionButton } from "./floating-action-button"
import { DashboardHeader } from "./dashboard-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Side Menu */}
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />

      {/* Main Content */}
      <div className="pb-20 md:pb-6">
        <div className="container mx-auto px-4 py-6">
          <DashboardHeader onMenuClick={() => setIsSideMenuOpen(true)} />
        </div>
        <main className="container mx-auto px-4">{children}</main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  )
}
