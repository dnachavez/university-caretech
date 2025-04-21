"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Lock, Loader2 } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"
import { AuthService } from "@/services/auth-service"

interface SignInFormProps {
  onTabChange: (tab: string) => void
}

export function SignInForm({ onTabChange }: SignInFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { login, loading } = useAuthStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: checked
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.username.trim()) {
      newErrors.username = "Username or email is required"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.username, 
          password: formData.password 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error statuses
        if (response.status === 403) {
          switch(data.status) {
            case 'UNVERIFIED':
              toast.error("Your email is not verified. Please check your email for the verification link.")
              break
            case 'PENDING_APPROVAL':
              toast.warning("Your account is awaiting administrator approval. You'll be notified once approved.")
              break
            case 'SUSPENDED':
              toast.error("Your account has been suspended. Please contact administrator.")
              break
            default:
              toast.error(data.error || "Access denied")
          }
        } else if (response.status === 401) {
          // For invalid credentials, show inline error
          setErrors({
            password: "Invalid username/email or password"
          })
        } else {
          toast.error(data.error || "Failed to sign in")
        }
        return
      }

      // If successful, update auth store and redirect
      const result = await login(formData.username, formData.password)
      if (result) {
        const user = useAuthStore.getState().user
        if (user) {
          const dashboardPath = AuthService.getDashboardPathByRole(user.role)
          router.push(dashboardPath)
        }
      }
    } catch (error: any) {
      console.error("Login error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#5b6779] text-sm font-medium">
              Username or Email
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="username"
                placeholder="Enter your username or email"
                className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.username ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
            </div>
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#5b6779] text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.password ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rememberMe" 
                checked={formData.rememberMe}
                onCheckedChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-[#dde5f0] text-[#166cbb] focus:ring-[#d9e6fb]" 
              />
              <Label htmlFor="rememberMe" className="text-sm text-[#5b6779]">
                Remember Me
              </Label>
            </div>
            <Link href="/auth/forgot-password" className="text-sm font-medium text-[#166cbb] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-3 mt-4 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="relative flex items-center justify-center mt-4">
            <Separator className="absolute w-full" />
            <span className="bg-[#f5f5ff] px-2 text-sm text-[#5b6779] relative">OR</span>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={() => onTabChange("signup")}
            className="w-full py-2 px-3 mt-4 bg-[#f5f5ff] text-[#5b6779] font-medium text-sm rounded-lg border border-[#dde5f0] hover:bg-[#eef2fb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
          >
            Don't have an account? Sign up
          </Button>
        </div>
      </form>
    </div>
  )
} 