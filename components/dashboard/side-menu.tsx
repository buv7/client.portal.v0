"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
} from "lucide-react"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuItems = [
    { icon: User, label: "Edit Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Star, label: "Upgrade to Pro", href: "/upgrade", highlight: true },
    { icon: Heart, label: "Health Connections", href: "/health" },
    { icon: Brain, label: "AI Usage", href: "/ai-usage" },
    { icon: Download, label: "Export Progress", href: "/export" },
    { icon: GraduationCap, label: "Apply to become a Coach", href: "/become-coach" },
    { icon: UtensilsCrossed, label: "Nutrition Plans", href: "/nutrition-plans" },
    { icon: GraduationCap, label: "Master VAGUS", href: "/learning" },
    { icon: HelpCircle, label: "Support", href: "/support" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 bg-sidebar border-sidebar-border">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/vagus-logo-white.png" alt="VAGUS Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <SheetTitle className="text-sidebar-foreground">VAGUS</SheetTitle>
              <p className="text-sm text-sidebar-foreground/70">Client Portal</p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    item.highlight ? "text-sidebar-primary" : ""
                  }`}
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
