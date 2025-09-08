"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  Star,
  Heart,
  Brain,
  Download,
  GraduationCap,
  UtensilsCrossed,
  HelpCircle,
  LogOut,
  Search,
  Home,
  Dumbbell,
  Calendar,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
  Activity,
  Target,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isQuickAccessExpanded, setIsQuickAccessExpanded] = useState(true)

  const mainNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Dumbbell, label: "Workouts", href: "/workouts" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: UtensilsCrossed, label: "Nutrition", href: "/nutrition" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
  ]

  const quickAccessItems = [
    { icon: Activity, label: "Today's Workout", href: "/workouts/today", count: 3 },
    { icon: Target, label: "Goals", href: "/goals", count: 5 },
    { icon: TrendingUp, label: "Progress", href: "/progress", count: 12 },
  ]

  const accountItems = [
    { icon: User, label: "Edit Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Heart, label: "Health Connections", href: "/health" },
    { icon: Brain, label: "AI Usage", href: "/ai-usage" },
    { icon: Download, label: "Export Progress", href: "/export" },
  ]

  const learningItems = [
    { icon: GraduationCap, label: "Master VAGUS", href: "/learning" },
    { icon: Star, label: "Apply to become a Coach", href: "/become-coach" },
    { icon: User, label: "Coach Portal", href: "/coach/auth/login" },
    { icon: HelpCircle, label: "Support", href: "/support" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 bg-sidebar border-sidebar-border p-0 flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/vagus-logo-white.png" alt="VAGUS Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-sidebar-foreground">VAGUS</h2>
              <p className="text-sm text-sidebar-foreground/70">Client Portal</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-sidebar-foreground/50 bg-sidebar-accent-foreground/10 px-1.5 py-0.5 rounded">
              ⌘F
            </kbd>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider mb-3">Navigation</h3>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      onClick={onClose}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <Separator className="bg-sidebar-border" />

          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-between text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider mb-3 h-auto p-0"
              onClick={() => setIsQuickAccessExpanded(!isQuickAccessExpanded)}
            >
              Quick Access
              <ChevronDown className={`h-3 w-3 transition-transform ${isQuickAccessExpanded ? "rotate-180" : ""}`} />
            </Button>
            {isQuickAccessExpanded && (
              <div className="space-y-1">
                {quickAccessItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        onClick={onClose}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </div>
                        <Badge variant="secondary" className="bg-sidebar-accent text-sidebar-foreground text-xs">
                          {item.count}
                        </Badge>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <Separator className="bg-sidebar-border" />

          <div className="p-4">
            <h3 className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider mb-3">Account</h3>
            <div className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      onClick={onClose}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <Separator className="bg-sidebar-border" />

          <div className="p-4">
            <h3 className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider mb-3">Learning</h3>
            <div className="space-y-1">
              {learningItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      onClick={onClose}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-sidebar-border p-4 space-y-4">
          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint-aqua to-soft-yellow flex items-center justify-center text-dark-charcoal font-semibold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Alex Johnson</p>
              <p className="text-xs text-sidebar-foreground/70">alex@example.com</p>
            </div>
            <Badge className="bg-soft-yellow text-dark-charcoal text-xs font-medium">Pro</Badge>
          </div>

          {/* Upgrade Button */}
          <Button className="w-full bg-mint-aqua text-dark-charcoal hover:bg-mint-aqua/90 font-medium">
            <Star className="h-4 w-4 mr-2" />
            Upgrade to Pro
          </Button>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className={`flex-1 ${!isDarkMode ? "bg-sidebar-accent" : ""}`}
              onClick={() => setIsDarkMode(false)}
            >
              <Sun className="h-4 w-4 mr-2" />
              Light
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`flex-1 ${isDarkMode ? "bg-sidebar-accent" : ""}`}
              onClick={() => setIsDarkMode(true)}
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </Button>
          </div>

          {/* Logout */}
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
