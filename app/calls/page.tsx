import { Suspense } from "react"
import { LiveCallsScreen } from "@/components/calls/live-calls-screen"

export default function CallsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <LiveCallsScreen />
      </Suspense>
    </div>
  )
}
