"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Custom Dashboard Header with Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back, {user.firstName}!
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Dashboard</span>
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/student/medical/consultation">
            <Card className="bg-white shadow-sm hover:border-blue-500 transition-all cursor-pointer">
              <CardContent className="flex flex-col sm:flex-row items-center sm:items-start p-4 gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-medium text-lg">Schedule a Consultation</h3>
                  <p className="text-muted-foreground">Book an appointment with a healthcare provider</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/student/medical/clearance">
            <Card className="bg-white shadow-sm hover:border-blue-500 transition-all cursor-pointer">
              <CardContent className="flex flex-col sm:flex-row items-center sm:items-start p-4 gap-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-medium text-lg">Request Medical Clearance</h3>
                  <p className="text-muted-foreground">Apply for your medical clearance documents</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
} 