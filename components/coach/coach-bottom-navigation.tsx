"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, Dumbbell, Calendar, MessageSquare, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoachBottomNavigationProps {
  onMenuClick: () => void
}

export function CoachBottomNavigation({ onMenuClick }: CoachBottomNavigationProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/coach/dashboard", icon: Home, label: "Dashboard" },
    { href: "/coach/clients", icon: Users, label: "Clients" },
    { href: "/coach/plans", icon: Dumbbell, label: "Plans" },
    { href: "/coach/calendar", icon: Calendar, label: "Calendar" },
    { href: "/coach/messages", icon: MessageSquare, label: "Messages" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div
                className={`flex flex-col items-center py-2 px-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </Link>
          )
        })}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="flex flex-col items-center py-2 px-1 text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs mt-1">Menu</span>
        </Button>
      </div>
    </div>
  )
}
