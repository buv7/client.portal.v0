import { CalendarViewer } from "@/components/calendar/calendar-viewer"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <CalendarViewer />
    </DashboardLayout>
  )
}
