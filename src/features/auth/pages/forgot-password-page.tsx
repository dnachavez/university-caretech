"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import Link from "next/link"
import { Mail, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ForgotPasswordData } from "@/types/auth"
import { useAuthStore } from "@/store/auth-store"

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()
  const { forgotPassword, loading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }
    
    setIsSubmitting(true)

    try {
      // Call the auth store to send password reset email
      const forgotPasswordData: ForgotPasswordData = { email }
      const success = await forgotPassword(forgotPasswordData)
      
      if (success) {
        setEmailSent(true)
        toast.success("Password reset instructions have been sent to your email")
      } else {
        toast.error("Failed to send reset instructions. Please try again.")
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Forgot Your Password?"
      description="Enter your email address below and we'll send you instructions to reset your password."
    >
      <div className="space-y-4">
        {emailSent ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 rounded-lg mb-4">
              <p className="text-green-700 text-sm">
                We've sent password reset instructions to <span className="font-semibold">{email}</span>. 
                Please check your email inbox and follow the link to reset your password.
              </p>
            </div>
            
            <Button 
              onClick={() => router.push("/auth")}
              className="w-full py-2 px-3 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
            >
              Return to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#5b6779] text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                    required
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full py-2 px-3 mt-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
              >
                {isSubmitting || loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending email...
                  </>
                ) : (
                  "Send Reset Instructions"
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
        )}
      </div>
    </AuthLayout>
  )
} 