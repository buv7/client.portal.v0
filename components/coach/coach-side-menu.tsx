"use client"

import {
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  Users,
  Dumbbell,
  Calendar,
  MessageSquare,
  FileText,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

interface CoachSideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function CoachSideMenu({ isOpen, onClose }: CoachSideMenuProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Side Menu */}
      <div className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/vagus-logo-white.png" alt="VAGUS Logo" width={32} height={32} className="object-contain" />
              <div>
                <h2 className="font-bold">VAGUS</h2>
                <p className="text-sm text-muted-foreground">Coach Portal</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Coach Profile */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/vagus-logo-white.png"
                  alt="Coach Avatar"
                  width={48}
                  height={48}
                  className="rounded-full object-cover bg-muted"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">Coach Sarah</h3>
                  <p className="text-sm text-muted-foreground">sarah@coach.com</p>
                  <Badge variant="secondary" className="mt-1 bg-accent text-accent-foreground">
                    Pro
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navigation</h3>
              <div className="space-y-1">
                <Link href="/coach/dashboard" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 className="mr-3 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/coach/clients" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-3 h-4 w-4" />
                    Client Management
                  </Button>
                </Link>
                <Link href="/coach/plans" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Dumbbell className="mr-3 h-4 w-4" />
                    Plan Builder
                  </Button>
                </Link>
                <Link href="/coach/calendar" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="mr-3 h-4 w-4" />
                    Calendar
                  </Button>
                </Link>
                <Link href="/coach/messages" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="mr-3 h-4 w-4" />
                    Messages
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tools</h3>
              <div className="space-y-1">
                <Link href="/coach/forms" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="mr-3 h-4 w-4" />
                    Intake Forms
                  </Button>
                </Link>
                <Link href="/coach/analytics" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 className="mr-3 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Account</h3>
              <div className="space-y-1">
                <Link href="/coach/profile" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-3 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/coach/settings" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="mr-3 h-4 w-4" />
                  Upgrade to Pro
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="mr-3 h-4 w-4" />
                  Support
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive">
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
