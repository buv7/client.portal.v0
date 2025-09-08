import { CoachDashboardLayout } from "@/components/coach/coach-dashboard-layout"
import { ClientProgressDetail } from "@/components/coach/client-progress-detail"

interface ClientProgressPageProps {
  params: {
    clientId: string
  }
}

export default function ClientProgressPage({ params }: ClientProgressPageProps) {
  return (
    <CoachDashboardLayout>
      <div className="p-6">
        <ClientProgressDetail clientId={params.clientId} />
      </div>
    </CoachDashboardLayout>
  )
}
