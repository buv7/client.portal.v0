import { Suspense } from "react"
import { MessengerScreen } from "@/components/messages/messenger-screen"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <MessengerScreen />
      </Suspense>
    </div>
  )
}
