"use client"

import type React from "react"
import Link from "next/link"
import { User, Lock, Loader2 } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

interface SignInFormProps {
  onTabChange: (tab: string) => void
}

export function SignInForm({ onTabChange }: SignInFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#5b6779] text-sm font-medium">
              Username
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
            </div>
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
                className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="h-4 w-4 rounded border-[#dde5f0] text-[#166cbb] focus:ring-[#d9e6fb]" />
              <Label htmlFor="remember" className="text-sm text-[#5b6779]">
                Remember Me
              </Label>
            </div>
            <Link href="/auth/forgot-password" className="text-sm font-medium text-[#166cbb] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-3 mt-4 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? (
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
            className="w-full py-2 px-3 mt-4 bg-[#f5f5ff] text-[#5b6779] font-medium text-sm rounded-lg border border-[#dde5f0] hover:bg-[#eef2fb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
          >
            Sign in as an Administrator
          </Button>
        </div>
      </form>
    </div>
  )
} 