"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/features/medical/components/page-header"
import { Activity } from "lucide-react"

export default function OthersPage() {
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
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Health Monitoring" 
        description="Track your vital signs and health metrics." 
        currentPage="Others"
        baseUrl="/fs"
      />

      {/* Placeholder card */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <Activity className="h-16 w-16 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Health Monitoring Tools</h2>
          <p className="text-gray-500 max-w-lg">
            This feature is coming soon! You'll be able to track your vitals, record health metrics, 
            and monitor your overall wellness over time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 