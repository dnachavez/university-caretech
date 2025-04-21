"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import Link from "next/link"
import { Lock, Loader2 } from "lucide-react"
import { useState } from "react"

export default function ResetPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      description="Create a new password for your account. Make sure it's at least 8 characters and includes a mix of letters, numbers, and symbols."
    >
      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-[#5b6779] text-sm font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  id="new-password"
                  placeholder="Enter your new password"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
              <p className="text-xs text-[#5b6779]">Min. 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#5b6779] text-sm font-medium">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your new password"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-3 mt-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>

            <div className="relative flex items-center justify-center mt-4">
              <Separator className="absolute w-full" />
              <span className="bg-[#f5f5ff] px-2 text-sm text-[#5b6779] relative">OR</span>
            </div>

            <div className="text-center mt-4">
              <Link 
                href="/auth"
                className="text-sm font-medium text-[#166cbb] hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
} 