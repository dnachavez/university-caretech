"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "@/features/auth/components/sign-in-form"
import { SignUpForm } from "@/features/auth/components/sign-up-form"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth-store"
import { AuthService } from "@/services/auth-service"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin")
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // If user is authenticated, redirect to appropriate dashboard
    if (isAuthenticated && user) {
      const dashboardPath = AuthService.getDashboardPathByRole(user.role)
      router.push(dashboardPath)
      return
    }

    // Handle verification params if not authenticated
    const verification = searchParams.get('verification')
    const role = searchParams.get('role')

    if (verification === 'verified') {
      toast.success(
        "Your email has been verified! You can now sign in to your account."
      )
      setActiveTab("signin")
    } else if (verification === 'approval_required' && role) {
      toast.info(
        `Your email has been verified. Since you're registering as ${role}, your account needs administrative approval before you can sign in.`,
        {
          duration: 6000
        }
      )
      setActiveTab("signin")
    }
  }, [searchParams, isAuthenticated, user, router])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <AuthLayout 
      title="Welcome to the Health Portal" 
      description="Access your medical records, submit forms, and schedule appointments with your university health services."
    >
      <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#f5fafa]">
          <TabsTrigger value="signin" className="data-[state=active]:bg-[#ffffff]">Sign In</TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:bg-[#ffffff]">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm onTabChange={handleTabChange} />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm onTabChange={handleTabChange} />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  )
} 