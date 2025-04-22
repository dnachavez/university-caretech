"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import Link from "next/link"
import { Lock, Loader2, AlertCircle } from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { ResetPasswordData } from "@/types/auth"
import { useAuthStore } from "@/store/auth-store"

function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [token, setToken] = useState<string | null>(null)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resetPassword, loading } = useAuthStore()

  useEffect(() => {
    // Extract the token from the URL query parameters
    const tokenParam = searchParams.get('token')
    
    if (!tokenParam) {
      setTokenValid(false)
      setIsValidating(false)
      return
    }
    
    setToken(tokenParam)
    
    // Validate the token with the API
    const validateToken = async () => {
      try {
        const response = await fetch(`/api/auth/validate-reset-token?token=${tokenParam}`)
        const data = await response.json()
        
        if (data.valid) {
          setTokenValid(true)
          setUserEmail(data.email)
        } else {
          setTokenValid(false)
          toast.error(data.error || "Invalid or expired token")
        }
      } catch (error) {
        console.error("Token validation error:", error)
        setTokenValid(false)
        toast.error("Failed to validate reset token")
      } finally {
        setIsValidating(false)
      }
    }
    
    validateToken()
  }, [searchParams])
  
  const validatePassword = () => {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return false
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePassword() || !token) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // Call the auth store to reset the password
      const resetPasswordData: ResetPasswordData = { 
        password,
        confirmPassword,
        token
      }
      
      const success = await resetPassword(resetPasswordData)
      
      if (success) {
        toast.success("Your password has been reset successfully")
        // Redirect to sign in page after a successful password reset
        setTimeout(() => {
          router.push("/auth")
        }, 1500)
      } else {
        toast.error("Failed to reset password. Please try again.")
      }
    } catch (error) {
      console.error("Reset password error:", error)
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while validating the token
  if (isValidating) {
    return (
      <AuthLayout
        title="Validating Reset Link"
        description="Please wait while we validate your password reset link..."
      >
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-[#166cbb] mb-4" />
          <p className="text-[#5b6779] text-sm text-center">
            Validating your password reset link...
          </p>
        </div>
      </AuthLayout>
    )
  }

  if (tokenValid === false) {
    return (
      <AuthLayout
        title="Invalid or Expired Link"
        description="The password reset link is invalid or has expired. Please request a new password reset link."
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg mb-4 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <p className="text-red-700 text-sm">
              This password reset link is invalid or has expired.
              Please request a new password reset link.
            </p>
          </div>
          
          <Button 
            onClick={() => router.push("/auth/forgot-password")}
            className="w-full py-2 px-3 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
          >
            Request New Reset Link
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
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      description={userEmail ? `Create a new password for ${userEmail}. Make sure it's at least 8 characters and includes a mix of letters, numbers, and symbols.` : "Create a new password for your account. Make sure it's at least 8 characters and includes a mix of letters, numbers, and symbols."}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                  required
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                  required
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || loading || !tokenValid}
              className="w-full py-2 px-3 mt-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
            >
              {isSubmitting || loading ? (
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout
        title="Loading"
        description="Please wait..."
      >
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-[#166cbb] mb-4" />
          <p className="text-[#5b6779] text-sm text-center">
            Loading...
          </p>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
} 