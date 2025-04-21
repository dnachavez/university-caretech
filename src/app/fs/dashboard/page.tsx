"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"

export default function FacultyStaffDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a faculty or staff
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : '/admin/dashboard')
    }
  }, [isAuthenticated, user, router])
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#166cbb] mb-6">
          {user.role === 'FACULTY' ? 'Faculty' : 'Staff'} Dashboard
        </h1>
        <p className="text-[#5b6779]">
          Welcome, {user.firstName}! This is the {user.role.toLowerCase()} dashboard placeholder.
        </p>
      </div>
    </div>
  )
} 