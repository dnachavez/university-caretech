"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <div className="max-w-7xl mx-auto">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Welcome, {user.firstName}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the student dashboard. Content will be added soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 