"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Loader2, CheckCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    // Simulate resend
    setTimeout(() => {
      setIsResending(false)
      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 3000)
    }, 1000)
  }

  const handleCheckEmail = async () => {
    setIsChecking(true)
    // Simulate checking verification status
    setTimeout(() => {
      setIsChecking(false)
      // For demo, redirect to dashboard
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to your email address. Click the link to activate your VAGUS account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleCheckEmail} className="w-full" disabled={isChecking}>
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Status...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                I've Verified My Email
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Didn't receive it?</span>
            </div>
          </div>

          <Button variant="outline" onClick={handleResend} className="w-full bg-transparent" disabled={isResending}>
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </Button>

          {resendSuccess && (
            <div className="text-center text-sm text-primary">Verification email sent successfully!</div>
          )}

          <div className="text-center">
            <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary">
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
