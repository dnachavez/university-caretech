"use client"

import type React from "react"
import { ChevronDown, User, Mail, Phone, Lock, Loader2 } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SignUpFormProps {
  onTabChange: (tab: string) => void
}

export function SignUpForm({ onTabChange }: SignUpFormProps) {
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="text-[#5b6779] text-sm font-medium">
                First Name
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="firstname"
                  placeholder="Enter your first name"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="text-[#5b6779] text-sm font-medium">
                Last Name
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="lastname"
                  placeholder="Enter your last name"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5b6779] text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#5b6779] text-sm font-medium">
                Phone
              </Label>
              <div className="relative">
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-username" className="text-[#5b6779] text-sm font-medium">
              Username
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="new-username"
                placeholder="Create a username"
                className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-[#5b6779] text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  id="new-password"
                  placeholder="Create a password"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
              <p className="text-xs text-[#5b6779]">Min. 8 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#5b6779] text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-[#5b6779] text-sm font-medium">
              Role
            </Label>
            <Select>
              <SelectTrigger id="role" className="w-full bg-[#f5f5ff] text-[#5b6779] rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-3 mt-4 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up"
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