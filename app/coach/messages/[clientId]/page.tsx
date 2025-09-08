"use client"
import { useParams } from "next/navigation"
import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { IndividualMessenger } from "@/components/coach/individual-messenger"

export default function ClientMessengerPage() {
  const params = useParams()
  const clientId = params.clientId as string

  return (
    <CoachDashboardLayout>
      <div className="h-[calc(100vh-4rem)]">
        <IndividualMessenger clientId={clientId} />
      </div>
    </CoachDashboardLayout>
  )
}
