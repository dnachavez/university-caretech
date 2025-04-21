"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"

export default function StudentDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a student
    if (user.role !== 'STUDENT') {
      router.push(user.role === 'ADMIN' ? '/admin/dashboard' : '/fs/dashboard')
    }
  }, [isAuthenticated, user, router])
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#166cbb] mb-6">Student Dashboard</h1>
        <p className="text-[#5b6779]">
          Welcome, {user.firstName}! This is the student dashboard placeholder.
        </p>
      </div>
    </div>
  )
} 